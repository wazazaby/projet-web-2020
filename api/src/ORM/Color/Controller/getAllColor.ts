import { Context } from 'koa';
import { ManagerColor } from '../Manager/ManagerColor';
import { Color } from "../Entity/Color";

export class GetColors {
    private _ctx: Context;

    constructor (ctx: Context) {
        this._ctx = ctx;
    }

    /**
     * Permet de récupérer toute les couleurs de la table `color`
     * getColors
     * @return [color]
     */
    public async getColors(): Promise<void> {

        const manager: ManagerColor = new ManagerColor();
        const allColors: Array<Color> | null = await manager.getColor();

        this._ctx.body = allColors;
    }
}