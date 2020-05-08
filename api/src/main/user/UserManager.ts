import { Db } from '../../libs/Db';
import { User } from './UserEntity';
import { InsertReturnInterface } from '@osmo6/models'
import * as bcrypt from 'bcrypt';

/**
 * Manager User
 */
export class UserManager {

    /**
     * Permet de récupérer un utilisateur en fonction de son mail
     * @param {string} mail
     * @returns {Promise<User|null>} l'utilisateur qui correspond au mail, ou null s'il n'existe pas
     */
    public async getUserByMail (mail: string): Promise<User|null> {
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

    /**
     * Permet d'insérer un nouvel utilisateur
     * @param {User} user l'utilisateur à inséré
     * @returns {Promise<InsertReturnInterface>} le résultats de l'insert
     */
    public async insertUser (user: User): Promise<InsertReturnInterface> {
        const sql: string = 'INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            const insert: any = await Db.pool.execute(sql, [
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPass(),
                user.getImg(),
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

    /**
     * Permet de récuperer un user en fonction de son token d'activation
     * @param {string} token le token contenu dans le mail d'activation de l'utilisateur
     * @returns {Promise<User|null>} retourne l'utilisateur en question ou null si rien n'est trouvé
     */
    public async getUserByToken (token: string): Promise<User|null> {
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

    /**
     * Permet de mettre à jour un utilisateur depuis son objet User
     * @param {User} user l'utilisateur à mettre à jour
     * @returns {Promise<InsertReturnInterface>} le résultat de l'update
     */
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

    /**
     * Permet de récupérer un user en fonction de son mail et son mot de passe
     * L'email et le passe de l'user
     * @param {string} email 
     * @param {string} pass
     * @returns {Promise<User|null>} retourne l'utilisateur trouvé avec ce mail et ce mot de passe, ou null
     */
    public async getUserByMailAndPass (email: string, pass: string): Promise<User|null> {
        const sql: string = `
            SELECT * FROM user
            WHERE email_user = ?
        `;

        try {

            // On récupère d'abord un user en fonction du mail
            // Si il n'existe pas alors on renvoit null
            const dbCall: any = await Db.pool.execute(sql, [email]);
            if (dbCall[0].length === 1) {

                // Si il existe, on va comparer les deux mot de passe (celui du formulaire, et celui qui est crypté en BDD)
                const user: User = new User(dbCall[0][0]);
                
                // Si ça match, l'utilisateur est connecté
                if (await bcrypt.compare(pass, user.getPass())) {
                    return user;
                } else {
                    return null;
                }
            } else {
                return null
            }
        } catch (e) {
            throw e;
        }
    }
}