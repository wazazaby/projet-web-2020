import { Context } from 'koa';
import { ManagerUser } from './UserManager';
import { User } from './UserEntity';
import { InsertReturnInterface } from '@osmo6/models';
import { Mailer } from '../../libs/Mailer';
import { Body } from '../../libs/Body';
import * as RandomString from 'randomstring';
import * as bcrypt from 'bcrypt';

export class UserController {
    private _manager: ManagerUser;
    private _hash: number = 10;

    constructor () {
        this._manager = new ManagerUser();
    }

    public async createUser (ctx: Context): Promise<void> {
        const newUser: User = new User({
            id_user: null,
            name_user: ctx.request.body.name,
            email_user: ctx.request.body.email,
            pass_user: await bcrypt.hash(ctx.request.body.pass, this._hash),
            actif_user: 0,
            rgpd_user: 1,
            token_user: RandomString.generate(),
            creation_date_user: Math.floor(Date.now() / 1000),
            modification_date_user: null
        });

        const check: User | null = await this._manager.getUserByMail(newUser.getEmail());

        if (check === null) {
            const result: InsertReturnInterface = await this._manager.insertUser(newUser);

            if (result.affectedRows == 1 && result.insertId > 0) {
                const mailer: Mailer = new Mailer(
                    newUser.getEmail(), 
                    'Activation de votre compte TurnStyle', 
                    `
                    <div>
                        <h2>Bienvenue sur Turnstyle!</h2>
                        <p>
                            <a href="http://localhost:3000/api/user/activate/${newUser.getToken()}">Merci de cliquer sur ce lien pour activer votre compte !</a>
                        </p>
                    </div>
                    `
                );

                const sentMail: boolean = await mailer.sendMail();
                if (sentMail) {
                    ctx.body = new Body(204, "Un mail d'activation vous a été envoyé");
                } else {
                    ctx.throw(400, "Problème lors de l'envoie du mail d'activation");
                }
            } else {
                ctx.throw(400, 'Problème lors de la création de votre compte, merci de réessayer');
            }
        } else {
            ctx.throw(400, 'Vous avez déjà un compte sur notre plateforme');
        }
    }

    public async activateUser (ctx: Context): Promise<void> {
        const token: string = ctx.params.token;
        const user: User | null = await this._manager.getUserByToken(token);

        if (user !== null) {
            if (user.getActif() === 0) {
                user.setActif(1);
                const result: InsertReturnInterface = await this._manager.updateUser(user);
                if (result.affectedRows == 1) {
                    ctx.body = new Body(200, 'Votre compte a bien été activé', {email: user.getEmail()});
                } else {
                    ctx.throw(400, "Problème lors de l'activation de votre compte, merci de rééssayer");
                }
            } else if (user.getActif() === 1) {
                ctx.throw(300, 'Votre compte à déjà été activé, vous pouvez vous connecter', {email: user.getEmail()});
            }
        } else {
            ctx.throw(400, "Votre lien d'activation n'est pas valide");
        }
    }

    public async connectUser (ctx: Context): Promise<void> {
        const mail: string = ctx.request.body.email;
        const pass: string = ctx.request.body.pass;

        const user: User | null = await this._manager.getUserByMailAndPass(mail, pass);

        if (user === null) {
            ctx.throw(400, 'Impossible de se connecter avec ces identifiants');
        } else {
            if (user.getActif() === 0) {
                ctx.throw(400, "Merci d'activer votre compte pour pouvoir vous connecter");
            } else {
                ctx.body = new Body(200, 'Connexion réussie', {id: user.getId(), name: user.getName(), email: user.getEmail()});
            }
        }
    }
}