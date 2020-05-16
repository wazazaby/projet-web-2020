import { Context } from 'koa';
import { InsertReturnInterface, ColorInterface } from '@osmo6/models';
import { ColorManager } from './ColorManager';
import { Color } from './ColorEntity';
import { Body } from '../../libs/Body';

export class ColorController {
    private _manager: ColorManager;

    constructor () {
        this._manager = new ColorManager();
    }

    async createColor (ctx: Context): Promise<void> {
        const newColor: Color = new Color({
            id_color: null,
            label_color: ctx.request.body.label_color,
            hex_color: ctx.request.body.hex_color,
            rgb_color: ctx.request.body.rgb_color,
        });

        const isExist: Color | null = await this._manager.getColor(newColor);

        if (isExist === null){
            const result: InsertReturnInterface = await this._manager.insertColor(newColor);

            if (result.affectedRows == 1 && result.insertId > 0) {
                newColor.id_color = result.insertId;
                // Color inséré
                ctx.body = newColor;
            } else {
                // Echec insert
                ctx.body = new Body(400, "Une erreur s'est produite", {result: result});
            }
        } else {
            ctx.body = new Body(401, 'La couleur éxiste déjà', {color: newColor});
        }
    }

    async getAllColors (ctx: Context): Promise<void> {
        const result: ColorInterface[] = await this._manager.getAllColors();
        if (result) {
            ctx.body = new Body(200, 'Ok', result);
        } else {
            ctx.body = new Body(403, "Aucune couleurs n'a été trouver");
        }
    }

    async getColor (ctx: Context): Promise<void> {
        ctx.body = await this._manager.getColor(ctx.params);
    }
}