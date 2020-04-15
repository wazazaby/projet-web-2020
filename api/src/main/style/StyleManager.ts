import { Db } from '../../libs/Db';
import { StyleInterface } from '@osmo6/models';

export class StyleManager {

    public async getAllStyle(): Promise<StyleInterface[] | null> {
        try {
            const dbCall: any = await Db.pool.execute('SELECT * FROM style ORDER BY label_style');
            const season: StyleInterface[] = dbCall[0];

            if (season.length > 0) {
                return season;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

}