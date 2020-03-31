import { Context } from 'koa';
import { Color } from '../Entity/Color';
import { ManagerColor } from '../Manager/ManagerColor';
import { ColorModel } from '@osmo6/models/lib/ColorModel';

export class CreateColor {
    private _ctx: Context;

    constructor (ctx: Context) {
        this._ctx = ctx;
    }

    public async getResult(): Promise<ColorModel | null> {

        const dataColor: ColorModel = {
            id_color: null,
            label_color: this._ctx.request.body.label,
            hex_color: this._ctx.request.body.hex,
            rgb_color: this._ctx.request.body.rgb,
        }

        const newColor: Color = new Color(dataColor);

        const manager: ManagerColor = new ManagerColor();
        const allColor: Array<ColorModel> | null = await manager.getColor();

        if (allColor.length != 0) {
            // vérif
            allColor.forEach((c: ColorModel) => {
                if (c.label_color === dataColor.label_color &&
                    c.hex_color === dataColor.hex_color &&
                    c.rgb_color === dataColor.rgb_color) {
                    // La couleur éxiste déjà
                    return this._ctx.throw(401, 'La couleur éxiste déjà', {color: newColor});
                }
            });
        }

        const result: any = await manager.insertColor(newColor);

        if (result.affectedRows == 1 && result.insertId > 0) {
            // Color inséré
            return this._ctx.body = dataColor;
        } else {
            // Echec insert
            return this._ctx.throw(400, `Une erreur c'est produite`, {result:result});
        }
    }
}