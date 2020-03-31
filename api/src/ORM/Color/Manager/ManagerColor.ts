import { Db } from '../../../OCFram/Db';
import { Color } from '../Entity/Color';
import { ColorModel } from '@osmo6/models/lib/ColorModel';

export class ManagerColor {

    public async getColor () {
        const sql: string = 'SELECT * FROM color';
        let allColors: Array<ColorModel> = [];
        // console.log(sql);

        try {
            const dbcolor: any = await Db.pool.execute(sql);

            if (dbcolor[0].length !== 0) {
                allColors = [];
                dbcolor[0].forEach((c: ColorModel) => {
                    const color = new Color(c);
                    allColors.push({
                        id_color: color.id,
                        label_color: color.label,
                        hex_color: color.hex,
                        rgb_color: color.rgb
                    });
                });

                return allColors;
            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }
    }

    public async insertColor (color: Color): Promise<ColorModel | null> {
        const sql: string = 'INSERT INTO color VALUES (?, ?, ?, ?)';
        // console.log(sql);

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