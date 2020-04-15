import { Db } from '../../libs/Db';
import { BrandInterface } from '@osmo6/models';

export class BrandManager {

    public async getAllBrand(): Promise<BrandInterface[] | null> {
        try {
            const dbCall: any = await Db.pool.execute('SELECT * FROM brand ORDER BY label_brand');
            const brand: BrandInterface[] = dbCall[0];

            if (brand.length > 0) {
                return brand;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

}