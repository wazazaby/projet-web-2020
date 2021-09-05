import { Context } from 'koa';
import { BrandManager } from './BrandManager';
import { Body } from '../../libs/Body';
import { BrandInterface } from '@osmo6/models';

export class BrandController {
    private _manager: BrandManager;

    constructor() {
        this._manager = new BrandManager();
    }

    async getAllBrand(ctx: Context): Promise<void> {
        const result: BrandInterface[] = await this._manager.getAllBrand();        
        ctx.body = result.length > 0 
            ? new Body(200, 'Ok', result) 
            : new Body(403, 'Aucune marque n\'a été trouvée');
    }
}
