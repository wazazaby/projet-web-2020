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

    public async insertUser (user: User): Promise<any> {
        const sql: string = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const insert: any = await Db.pool.execute(sql, [
                user.id,
                user.name,
                user.email,
                user.password,
                user.actif,
                user.rgpd,
                user.token,
                user.dateCrea,
                user.dateModif
            ]);
            
            return insert[0];
        } catch (e) {
            throw e;
        }
    }
}