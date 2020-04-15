import { Db } from '../../libs/Db';
import { TypeInterface } from '@osmo6/models';

export class TypeManager {

    public async getAllType(): Promise<TypeInterface[] | null> {
        try {
            const dbCall: any = await Db.pool.execute('SELECT * FROM type ORDER BY label_type');
            const type: TypeInterface[] = dbCall[0];

            if (type.length > 0) {
                return type;
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }

}