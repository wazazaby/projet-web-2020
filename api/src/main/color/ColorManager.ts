import { Db } from '../../libs/Db';
import { Color } from './ColorEntity';
import { ColorInterface, InsertReturnInterface } from '@osmo6/models';

export class ManagerColor {

    public async getAllColors (): Promise<Color[] | null> {
        const sql: string = 'SELECT * FROM color';
        try {
            const allColors: any = await Db.pool.execute(sql);
            const tabReturn: Color[] = [];
            if (allColors[0].length > 0) {
                allColors[0].forEach((color: ColorInterface) => {
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

}