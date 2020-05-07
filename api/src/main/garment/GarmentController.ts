import { GarmentManager } from './GarmentManager';
import { Context } from 'koa';
import { Garment } from './GarmentEntity';
import { Body } from '../../libs/Body';
import { GarmentColorStyleWrapperInterface } from '@osmo6/models';

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
            if (ctx.session.auth.id_user != idUser) {
                ctx.throw(403, "Vous n'avez pas accès à ce contenu");
            }
        }

        const garms: GarmentColorStyleWrapperInterface[] = await this._manager.getGarmentsByIdUser(idUser);
        ctx.body = new Body(200, "", garms);
    }
}