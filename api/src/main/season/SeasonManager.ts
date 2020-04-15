import { Db } from '../../libs/Db';
import { SeasonInterface } from '@osmo6/models';

export class SeasonManager {

    public async getAllSeason(): Promise<SeasonInterface[] | null> {
        try {
            const dbCall: any = await Db.pool.execute('SELECT * FROM season ORDER BY label_season');
            const season: SeasonInterface[] = dbCall[0];

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