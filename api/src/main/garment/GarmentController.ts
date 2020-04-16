import { GarmentManager } from './GarmentManager';
import { Context } from 'koa';
import { Garment } from './GarmentEntity';
import { Body } from '../../libs/Body';

export class GarmentController {
    private _manager: GarmentManager;

    /**
     * Constructeur de GarmentController
     */
    constructor () {
        this._manager = new GarmentManager;
    }

    /**
     * Permet de récupérer tout les vetement d'un utilisateur en fonction de son id
     * @param {Context} ctx 
     */
    public async getAllGarmentsByIdUser (ctx: Context): Promise<void> {
        const idUser: number = ctx.params.idUser;

        // Cette condition est a enlevée en prod
        if (ctx.session.auth) {
            if (ctx.session.auth.id != idUser) {
                ctx.throw(403, "Vous n'avez pas accès à ce contenu");
            }
        }

        const garms: Garment[]|null = await this._manager.getGarmentsByIdUser(idUser);
        if (garms === null) {
            ctx.throw(400, "Vous n'avez aucun vêtement dans votre garde-robe")
        } else {
            ctx.body = new Body(200, "", garms);
        }
    }
}