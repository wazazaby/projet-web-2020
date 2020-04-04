import { Context } from "koa";
import { ColorModel } from "@osmo6/models";
import { ManagerColor } from "./ColorManager";
import { Color } from "./ColorEntity";

export class ColorController {
    private manager: ManagerColor;

    constructor () {
        this.manager = new ManagerColor();
    }

    async createColor (ctx: Context): Promise<void> {
        const dataColor: ColorModel = {
            id_color: null,
            label_color: ctx.request.body.label,
            hex_color: ctx.request.body.hex,
            rgb_color: ctx.request.body.rgb,
        }

        const newColor: Color = new Color(dataColor);

        const allColor: Color[] | null = await this.manager.getAllColors();

        if (allColor.length > 0) {
            allColor.forEach((c: Color) => {
                if (
                    c.label == newColor.label 
                    && c.hex == newColor.hex 
                    && c.rgb == newColor.rgb
                ) {
                    // La couleur éxiste déjà
                    ctx.throw(401, 'La couleur éxiste déjà', {color: newColor});
                }
            });
        }
        
        const result: any = await this.manager.insertColor(newColor);

        if (result.affectedRows == 1 && result.insertId > 0) {

            // Color inséré
            ctx.body = dataColor;
        } else {

            // Echec insert
            ctx.throw(400, "Une erreur s'est produite", {result: result});
        }
    }

    async getAllColors (ctx: Context): Promise<void> {
        ctx.body = await this.manager.getAllColors();
    }
}