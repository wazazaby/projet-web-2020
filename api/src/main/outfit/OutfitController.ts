import { Context } from 'koa';
import { Body } from '../../libs/Body';
import { Auth } from '../../libs/Auth';
import { OutfitManager } from './OutfitManager';

export class OutfitController {
    private _manager: OutfitManager;

    constructor () {
        this._manager = new OutfitManager();
    }

    public async createOutfit (ctx: Context): Promise<void> {
        return;
    }
}