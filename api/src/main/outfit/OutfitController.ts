import { Context } from 'koa';
import { Body } from '../../libs/Body';
import { Auth } from '../../libs/Auth';
import { OutfitManager } from './OutfitManager';
import { Outfit } from './OutfitEntity';
import { OutfitGarmentWrapperInterface } from '@osmo6/models';

export class OutfitController {
    private _manager: OutfitManager;

    constructor () {
        this._manager = new OutfitManager();
    }

    /**
     * Controller de création d'une tenue
     * @param {Context} ctx 
     */
    public async createOutfit (ctx: Context): Promise<void> {

        // Vérification de l'authentification de la requette
        const idUser: number = Number(ctx.request.body.user_id_user);
        if (!Auth.isValid(ctx, idUser)) {
            ctx.body = new Body(403, "Vous n'avez pas accès à ce contenu");
            return;
        }

        // Le tableau d'id des garments de la tenue
        const garms: number[] = ctx.request.body.id_garments;

        // On instancie un objet Outfit avec les bonnes infos
        const fit: Outfit = new Outfit({
            id_outfit: null,
            label_outfit: ctx.request.body.label_outfit,
            creation_date_outfit: Math.floor(Date.now() / 1000),
            modification_date_outfit: null,
            user_id_user: idUser
        });

        // On lance l'insert de l'outfit et des liens dans la table d'associtation
        const res: (OutfitGarmentWrapperInterface|null) = await this._manager.insertOutfit(fit, garms);

        // Gestion des retours
        let status: number;
        let message: string;
        if (res === null) {
            status = 400;
            message = "Il y a eu un problème lors de la création de votre tenue";
        } else {
            status = 200;
            message = 'OK';
        }

        ctx.body = new Body(status, message, res);
        return;
    }
}