import { Db } from '../../OCFram/Db';
import { Color } from './ColorEntity';
import { ColorModel } from '@osmo6/models';

export class ManagerColor {

    public async getAllColors (): Promise<Color[] | null> {
        const sql: string = 'SELECT * FROM color';
        try {
            const allColors: any = await Db.pool.execute(sql);
            const tabReturn: Color[] = [];
            if (allColors[0].length > 0) {
                allColors[0].forEach((color: ColorModel) => {
                    tabReturn.push(new Color(color));
                });

                return tabReturn;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

    public async insertColor (color: Color): Promise<any> {
        const sql: string = 'INSERT INTO color VALUES (?, ?, ?, ?)';
        try {
            const insert: any = await Db.pool.execute(sql, [
                color.id,
                color.label,
                color.hex,
                color.rgb
            ]);

            return insert[0];
        } catch (e) {
            throw e;
        }
    }

}