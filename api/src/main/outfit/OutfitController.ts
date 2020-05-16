import { Context } from 'koa';
import { Body } from '../../libs/Body';
import { Auth } from '../../libs/Auth';
import { OutfitManager } from './OutfitManager';
import { Outfit } from './OutfitEntity';

export class OutfitController {
    private _manager: OutfitManager;

    constructor () {
        this._manager = new OutfitManager();
    }

    public async createOutfit (ctx: Context): Promise<void> {
        const idUser: number = Number(ctx.request.body.user_id_user);
        if (!Auth.isValid(ctx, idUser)) {
            return ctx.throw(403, "Vous n'avez pas accès à ce contenu");
        }

        const fit: Outfit = new Outfit({
            id_outfit: null,
            label_outfit: ctx.request.body.label_outfit,
            creation_date_outfit: Math.floor(Date.now() / 1000),
            modification_date_outfit: null,
            user_id_user: idUser
        });

        const test = await this._manager.insertOutfit(fit, { top: 96, mid: 89, bot: 95 });
    }
}