import { Context } from 'koa';

export class Auth {

    /**
     * Permet de vérifier si l'user à une session en cours
     * @param {Context} ctx 
     * @param {number} idUser 
     * @returns {boolean} true si authentifié, false dans le cas contraire
     */
    public static isValid (ctx: Context, idUser: number): boolean {

        // Si ctx.session.isNew est égale à true, ça veut dire que la séssion n'a pas encore été instanciée
        if (ctx.session.isNew === true) {
            return false;
        } else if (ctx.session.auth.id_user !== idUser) {
            return false;
        }

        // Si on arrive ici, ça veut dire que la session est valide
        return true;
    }

    public static byToken (ctx: Context, token: string): boolean {
        if (ctx.session.isNew === true) {
            return false;
        } else if (ctx.session.auth.token_user !== token) {
            return false;
        }

        return true;
    }
}