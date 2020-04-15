import { Db } from '../../libs/Db';
import { Color } from './ColorEntity';
import { InsertReturnInterface, ColorInterface } from '@osmo6/models';

export class ColorManager {

    public async getAllColors (): Promise<Color[] | null> {
        try {
            const dbCall: any = await Db.pool.execute('SELECT * FROM color');
            const color: ColorInterface[] = dbCall[0];
            if (color.length > 0) {
                return color.map((color: ColorInterface) => new Color(color));
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    public async insertColor (color: Color): Promise<InsertReturnInterface> {
        const sql: string = 'INSERT INTO color VALUES (?, ?, ?, ?)';
        try {
            const insert: any = await Db.pool.execute(sql, [
                color.getId(),
                color.getLabel(),
                color.getHex(),
                color.getRgb()
            ]);

            return insert[0];
        } catch (e) {
            throw e;
        }
    }

    public async getColor (color: Color): Promise<Color | null> {
        const sql: string = `
            SELECT *
            FROM color
            WHERE label_color = ?
            AND hex_color = ?
            AND rgb_color = ?
        `;

        try {
            const dbColor: any = await Db.pool.execute(sql, [
                color.label_color,
                color.hex_color,
                color.rgb_color
            ]);

            if (dbColor[0].length > 0) {
                return dbColor[0];
            } else {
                return null;
            }

        } catch (err) {
            throw err;
        }
    }
}