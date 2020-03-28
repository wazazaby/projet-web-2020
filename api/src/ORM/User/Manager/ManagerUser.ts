import { Db } from '../../../OCFram/Db';
import { User } from '../Entity/User';

export class ManagerUser {

    public async getUserByMail (mail: string): Promise<User | null> {
        try {
            const dbUser: any = await Db.pool.execute('SELECT * FROM user WHERE user.email_user = ?', [mail]);
            if (dbUser[0].length === 1) {
                return new User(dbUser[0][0]);
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }
    }
}