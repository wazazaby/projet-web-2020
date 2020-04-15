import { Context } from 'koa';
import { TypeManager } from './TypeManager';
import { Body } from '../../libs/Body';
import { TypeInterface } from '@osmo6/models';

export class TypeController {
    private _manager: TypeManager;

    constructor () {
        this._manager = new TypeManager();
    }

    async getAllType (ctx: Context): Promise<void> {
        const result: TypeInterface[] = await this._manager.getAllType();
        if (result) {
            ctx.body = new Body(200, 'Ok', result);
        } else {
            ctx.throw(403, "Aucun type de vêtement n'a été trouver");
        }
    }

}