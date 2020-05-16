import { Context } from 'koa';
import { SeasonManager } from './SeasonManager';
import { Body } from '../../libs/Body';
import { SeasonInterface } from '@osmo6/models';

export class SeasonController {
    private _manager: SeasonManager;

    constructor () {
        this._manager = new SeasonManager();
    }

    async getAllSeason (ctx: Context): Promise<void> {
        const result: SeasonInterface[] = await this._manager.getAllSeason();
        if (result) {
            ctx.body = new Body(200, 'Ok', result);
        } else {
            ctx.body = new Body(403, "Aucune saison n'a été trouver");
        }
    }

}