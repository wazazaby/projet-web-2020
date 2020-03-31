import { ManagerUser } from "../Manager/ManagerUser";
import { Context } from 'koa';
import { User } from "../Entity/User";
import { UserModel } from "@osmo6/models";

export class CreateAccount {
    private _ctx: Context;

    constructor (ctx: Context) {
        this._ctx = ctx;
    }

    public async getResult (): Promise<void> {
        const dataUser: UserModel = {
            id_user: null,
            name_user: this._ctx.request.body.name,
            email_user: this._ctx.request.body.email,
            pass_user: this._ctx.request.body.pass,
            actif_user: 0,
            rgpd_user: this._ctx.request.body.rgpd,
            token_user: '1q2w3e4r5t6y7u8i9o0p',
            create_date_user: Math.floor(Date.now() / 1000),
            modification_date_user: null
        };

        const newUser: User = new User(dataUser);

        const manager: ManagerUser = new ManagerUser();
        const check: User | null = await manager.getUserByMail(newUser.email);

        if (check == null) {
            const result: any = await manager.insertUser(newUser);

            if (result.affectedRows == 1 && result.insertId > 0) {
                // User inséré, envoie mail d'activation
                this._ctx.body = result;
            } else {
                // Echec insert
            }
        } else {
            // Utilisateur éxiste déjà
        }
    }
}