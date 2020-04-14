import { Db } from '../../libs/Db';
import { Garment } from './GarmentEntity';
import { InsertReturnInterface, GarmentInterface } from '@osmo6/models'

/**
 * Manager Garment
 */
export class GarmentManager {
    public async getGarmentsByIdUser (idUser: number): Promise<Garment[] | null> {
        const sql: string = 'SELECT * FROM garment WHERE user_id_user = ?';

        try {
            const garms: any = await Db.pool.execute(sql, [idUser]);
            if (garms[0].length > 0) {
                return garms[0].map((garm: GarmentInterface) => new Garment(garm));
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }
}