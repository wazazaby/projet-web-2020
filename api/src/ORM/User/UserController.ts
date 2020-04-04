import { Context } from 'koa';
import { ManagerUser } from './UserManager';
import { User } from './UserEntity';
import { UserModel, InsertReturnModel } from '@osmo6/models';
import * as RandomString from 'randomstring';
import { Mailer } from '../../OCFram/Mailer';

export class UserController {
    private manager: ManagerUser;

    constructor () {
        this.manager = new ManagerUser();
    }

    public async createUser (ctx: Context): Promise<void> {
        const dataUser: UserModel = {
            id_user: null,
            name_user: ctx.request.body.name,
            email_user: ctx.request.body.email,
            pass_user: ctx.request.body.pass,
            actif_user: 0,
            rgpd_user: 1,
            token_user: RandomString.generate(),
            create_date_user: Math.floor(Date.now() / 1000),
            modification_date_user: null
        };

        const newUser: User = new User(dataUser);

        const check: User | null = await this.manager.getUserByMail(newUser.email);

        if (check == null) {
            const result: InsertReturnModel = await this.manager.insertUser(newUser);

            if (result.affectedRows == 1 && result.insertId > 0) {
                const mailer: Mailer = new Mailer(
                    newUser.email, 
                    'Activation de votre compte', 
                    `
                    <div>
                        <h2>Bienvenue sur Turnstyle!</h2>
                        <p>
                            <a href="http://localhost:3000/api/user/activate/${newUser.token}">Merci de cliquer sur ce lien pour activer votre compte !</a>
                        </p>
                    </div>
                    `
                );
                ctx.body = await mailer.sendMail();
            } else {
                ctx.throw(400, 'Problème lors de la création de votre compte, merci de réessayer', {mail: newUser.email});
            }
        } else {
            ctx.throw(400, 'Ce compte éxiste déjà', {mail: newUser.email});
        }
    }

    public async connectUser (): Promise<void> {

    }
}