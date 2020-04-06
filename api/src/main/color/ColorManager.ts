import { Db } from '../../libs/Db';
import { Color } from './ColorEntity';
import { ColorInterface, InsertReturnInterface } from '@osmo6/models';

export class ManagerColor {

    public async getAllColors (): Promise<Color[] | null> {
        const sql: string = 'SELECT * FROM color';
        try {
            const allColors: any = await Db.pool.execute(sql);
            const color: ColorInterface[] = allColors[0];

            const tabReturn: Color[] = [];
            if (color.length > 0) {
                color.forEach((c: ColorInterface) => {
                    tabReturn.push(new Color(c));
                });

                return tabReturn;
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
                AND rgb_color = ?`;

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