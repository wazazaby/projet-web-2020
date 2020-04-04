import { Context } from 'koa';
import { ManagerUser } from './UserManager';
import { User } from './UserEntity';
import { UserModel } from '@osmo6/models';

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
            rgpd_user: ctx.request.body.rgpd,
            token_user: '1q2w3e4r5t6y7u8i9o0p',
            create_date_user: Math.floor(Date.now() / 1000),
            modification_date_user: null
        };

        const newUser: User = new User(dataUser);

        const check: User | null = await this.manager.getUserByMail(newUser.email);

        if (check == null) {
            const result: any = await this.manager.insertUser(newUser);

            if (result.affectedRows == 1 && result.insertId > 0) {
                // User inséré, envoie mail d'activation
                ctx.body = result;
            } else {
                // Echec insert
            }
        } else {
            // Utilisateur éxiste déjà
        }
    }

    public async connectUser (): Promise<void> {

    }
}