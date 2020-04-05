import { Context } from 'koa';
import { ManagerUser } from './UserManager';
import { User } from './UserEntity';
import { InsertReturnInterface } from '@osmo6/models';
import { Mailer } from '../../libs/Mailer';
import * as RandomString from 'randomstring';

export class UserController {
    private manager: ManagerUser;

    constructor () {
        this.manager = new ManagerUser();
    }

    public async createUser (ctx: Context): Promise<void> {
        const newUser: User = new User({
            id_user: null,
            name_user: ctx.request.body.name,
            email_user: ctx.request.body.email,
            pass_user: ctx.request.body.pass,
            actif_user: 0,
            rgpd_user: 1,
            token_user: RandomString.generate(),
            create_date_user: Math.floor(Date.now() / 1000),
            modification_date_user: null
        });

        const check: User | null = await this.manager.getUserByMail(newUser.getEmail());

        if (check === null) {
            const result: InsertReturnInterface = await this.manager.insertUser(newUser);

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
                    ctx.body = {status: 200, message: 'Un mail d\'activation vous a été envoyé', data: newUser.getEmail()};
                } else {
                    ctx.throw(400, 'Problème lors de l\'envoie du mail d\'activation');
                }
            } else {
                ctx.throw(400, 'Problème lors de la création de votre compte, merci de réessayer', {mail: newUser.getEmail()});
            }
        } else {
            ctx.throw(400, 'Ce compte éxiste déjà', {mail: newUser.getEmail()});
        }
    }

    public async activateUser (ctx: Context): Promise<void> {
        const token: string = ctx.params.token;
        const user: User | null = await this.manager.getUserByToken(token);

        if (user !== null) {
            if (user.getActif() === 0) {
                user.setActif(1);
                const result: InsertReturnInterface = await this.manager.updateUser(user);
                if (result.affectedRows == 1) {
                    ctx.body = {email: user.getEmail()};
                } else {
                    ctx.throw(400, 'Problème lors de l\'activation de votre compte, merci de réessayer');
                }
            } else if (user.getActif() === 1) {
                ctx.throw(400, 'Votre compte à déjà été activé, vous pouvez vous connecter', {email: user.getEmail()});
            }
        } else {
            ctx.throw(400, 'Votre lien d\'activation n\'est pas valide');
        }
    }

    public async connectUser (): Promise<void> {

    }
}