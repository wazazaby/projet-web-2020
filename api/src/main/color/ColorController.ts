import { Context } from 'koa';
import { InsertReturnInterface } from '@osmo6/models';
import { ManagerColor } from './ColorManager';
import { Color } from './ColorEntity';

export class ColorController {
    private manager: ManagerColor;

    constructor () {
        this.manager = new ManagerColor();
    }

    async createColor (ctx: Context): Promise<void> {
        const newColor: Color = new Color({
            id_color: null,
            label_color: ctx.request.body.label_color,
            hex_color: ctx.request.body.hex_color,
            rgb_color: ctx.request.body.rgb_color,
        });

        const isExist: Color | null = await this.manager.getColor(newColor);

        if (isExist === null){
            const result: InsertReturnInterface = await this.manager.insertColor(newColor);

            if (result.affectedRows == 1 && result.insertId > 0) {
                newColor.id_color = result.insertId;
                // Color inséré
                ctx.body = newColor;
            } else {
                // Echec insert
                ctx.throw(400, "Une erreur s'est produite", {result: result});
            }
        } else {
            ctx.throw(401, 'La couleur éxiste déjà', {color: newColor});
        }
    }

    async getAllColors (ctx: Context): Promise<void> {
        ctx.body = await this.manager.getAllColors();
    }

    async getColor (ctx: Context): Promise<void> {
        ctx.body = await this.manager.getColor(ctx.params);
    }
}