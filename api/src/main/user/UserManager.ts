import { Db } from '../../libs/Db';
import { User } from './UserEntity';
import { InsertReturnInterface } from '@osmo6/models'

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

    public async insertUser (user: User): Promise<InsertReturnInterface> {
        const sql: string = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const insert: any = await Db.pool.execute(sql, [
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPass(),
                user.getActif(),
                user.getRgpd(),
                user.getToken(),
                user.getCreationDate(),
                user.getModificationDate()
            ]);

            return insert[0];
        } catch (e) {
            throw e;
        }
    }

    public async getUserByToken (token: string): Promise<User | null> {
        const sql: string = 'SELECT * FROM user WHERE user.token_user = ?';
        try {
            const dataUser: any = await Db.pool.execute(sql, [token]);
            if (dataUser[0].length > 0) {
                return new User(dataUser[0][0]);
            } else {
                return null;
            }
        } catch (e) {
            throw e;
        }
    }

    public async updateUser (user: User): Promise<InsertReturnInterface> {
        const sql: string = `
            UPDATE user
            SET name_user = ?,
                email_user = ?,
                pass_user = ?,
                actif_user = ?,
                token_user = ?,
                modification_date_user = ?
            WHERE user.id_user = ?
        `;

        try {
            const update: any = await Db.pool.execute(sql, [
                user.getName(),
                user.getEmail(),
                user.getPass(),
                user.getActif(),
                user.getToken(),
                Math.floor(Date.now() / 1000),
                user.getId()
            ]);

            return update[0];
        } catch (e) {
            throw e;
        }
    }
}