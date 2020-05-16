import { Context } from 'koa';
import { StyleManager } from './StyleManager';
import { Body } from '../../libs/Body';
import { StyleInterface } from '@osmo6/models';

export class StyleController {
    private _manager: StyleManager;

    constructor () {
        this._manager = new StyleManager();
    }

    async getAllStyle (ctx: Context): Promise<void> {
        const result: StyleInterface[] = await this._manager.getAllStyle();
        if (result) {
            ctx.body = new Body(200, 'Ok', result);
        } else {
            ctx.body = new Body(403, "Aucune saison n'a été trouver");
        }
    }

}