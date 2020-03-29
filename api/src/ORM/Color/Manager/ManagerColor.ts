import { Db } from '../../../OCFram/Db';
import { Color } from '../Entity/Color';
import { ColorInterface } from '../../../interfaces';

export class ManagerColor {

    public async getColor () {
        const sql: string = 'SELECT * FROM color';
        let allColors: Array<Color> = [];
        // console.log(sql);

        try {
            const dbcolor: any = await Db.pool.execute(sql);

            if (dbcolor[0].length !== 0) {
                allColors = [];
                dbcolor[0].forEach((c: ColorInterface) => {
                    const color = new Color(c);
                    allColors.push(color);
                });

                return allColors;
            } else {
                return null;
            }

        } catch (error) {
            throw error;
        }
    }

    public async insertColor (color: Color): Promise<Color | null> {
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