import { Context } from 'koa';
import { UserManager } from './UserManager';
import { User } from './UserEntity';
import { InsertReturnInterface } from '@osmo6/models';
import { Mailer } from '../../libs/Mailer';
import { Body } from '../../libs/Body';
import * as RandomString from 'randomstring';
import * as bcrypt from 'bcrypt';
import { Auth } from '../../libs/Auth';

// Type simple pour le contenu de la session
type UserAuth = {
    id_user: number;
    name_user: string;
    email_user: string;
    token_user: string;
    url_img_user?: string;
    actif_user?: number;
    creation_date_user: number;
    modification_date_user?: number;
}

export class UserController {
    private _manager: UserManager;
    private _hash: number = 10;

    /**
     * Constructeur de UserController
     * Initie juste un nouveau UserManager et le place en variable de classe
     */
    constructor () {
        this._manager = new UserManager();
    }

    /**
     * Permet de vérifier si l'user a une session pour le login
     * @param {Context} ctx 
     */
    public async verifyAuth (ctx: Context): Promise<void> {
        const token: string = ctx.request.body.token;
        const isAuthentified: boolean = Auth.byToken(ctx, token);        
        ctx.body = isAuthentified 
            ? new Body(200, "OK", ctx.session.auth) 
            : new Body(403, "Votre session a expirée, veuillez vous reconnecter");
    }

    /**
     * Permet de créer un utilisateur, et d'envoyer le mail d'activation
     * @param {Context} ctx
     */
    public async createUser (ctx: Context): Promise<void> {

        // En fonction des paramètres passés dans le body de la request, on crée un objet user
        const userPass = await bcrypt.hash(ctx.request.body.pass, this._hash);
        const pathAvatar = ['avatar0.png', 'avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'];

        const newUser: User = new User({
            id_user: null,
            name_user: ctx.request.body.name,
            email_user: ctx.request.body.email,
            pass_user: userPass,
            url_img_user: `/${pathAvatar[Math.floor(Math.random() * 5) + 0]}`,
            actif_user: 0,
            rgpd_user: 1,
            token_user: RandomString.generate(),
            creation_date_user: Math.floor(Date.now() / 1000),
            modification_date_user: null
        });

        // On va vérifier si l'utilisateur existe déjà
        const check: User | null = await this._manager.getUserByMail(newUser.getEmail());

        // Il n'existe pas
        if (check === null) {

            // On l'insert
            const result: InsertReturnInterface = await this._manager.insertUser(newUser);

            if (result.affectedRows == 1 && result.insertId > 0) {

                // Si il a bien été crée, on envoi le mail d'activation
                const mailer: Mailer = new Mailer(
                    newUser.getEmail(),
                    'Activation de votre compte TurnStyle',
                    `
                    <div>
                        <h2>Bienvenue sur Turnstyle!</h2>
                        <p>
                            <a href="${process.env.SERVER_FRONT}/#/auth?t=${newUser.getToken()}">Merci de cliquer sur ce lien pour activer votre compte !</a>
                        </p>
                    </div>
                    `
                );

                const mail: boolean = await mailer.sendMail();
                const status: number = mail ? 200 : 400;
                const message: string = mail 
                    ? "Votre compte a été crée et un mail d'activation vous a été envoyé" 
                    : "Il y a eu un problème lors de la création de votre compte, merci de réessayer";
                ctx.body = new Body(status, message);
                return;
            } else {
                ctx.body = new Body(403, "Il y a eu un problème lors de la création de votre compte, merci de réessayer");
                return;
            }
        } else {
            ctx.body = new Body(403, "Vous avez déjà un compte sur notre plateforme");
            return;
        }
    }

    /**
     * Passe l'actif du user de 0 à 1 en fonction du token passé dans les paramètres de la requette
     * @param {Context} ctx
     */
    public async activateUser (ctx: Context): Promise<void> {

        // On prend le token passé dans la requette, et on tente de récuperer un user avec ce token
        const token: string = ctx.params.token;
        const user: User | null = await this._manager.getUserByToken(token);
        
        // Si il y a un user avec ce token
        if (user !== null) {

            // On vérifie si son compte est déjà actif ou non
            if (user.getActif() === 0) {
                user.setActif(1);

                // On met à jour son status et on renvoi le résultat en fonction du succès ou non
                const result: InsertReturnInterface = await this._manager.updateUser(user);
                const status: number = result.affectedRows === 1 ? 200 : 400;
                const message: string = result.affectedRows === 1 
                    ? "Votre combien à bien été activé, vous pouvez vous connecter" 
                    : "Il y a eu un problème lors de l'activation de votre compte";
                ctx.body = new Body(status, message, { email: user.getEmail() });
                return;

                // Si son compte est déjà activé, on le redirigera vers la page de login
            } else if (user.getActif() === 1) {
                ctx.body = new Body(300, "Votre compte a déjà été activé, vous pouvez vous connecter", { email: user.getEmail() });
            }
        } else {
            ctx.body = new Body(400, "Votre lien d'activation n'est pas valide");
        }
    }

    /**
     * Permet de connecter un utilisateur en fonction de son mot de passe et de son email
     * Sauvegarde ses datas dans une variable de session
     * @param {Context} ctx 
     */
    public async connectUser (ctx: Context): Promise<void> {
        const mail: string = ctx.request.body.email;
        const pass: string = ctx.request.body.pass;

        // Si user est null, ça veut dire que les identifiants sont incorrectes ou que l'utilisateur n'existe pas
        const user: User|null = await this._manager.getUserByMailAndPass(mail, pass);

        if (user !== null) {

            // S'il essaye de se connecter mais qu'il n'a pas activer son compte
            if (user.getActif() === 0) {
                ctx.body = new Body(400, "Merci d'activer votre compte pour pouvoir vous connecter");
                return;
            } else {

                // Si tout est bon, on renvoit son id, name et email au front et on les passe en variable de session
                const auth: UserAuth = {
                    id_user: user.getId(), 
                    name_user: user.getName(), 
                    email_user: user.getEmail(),
                    token_user: user.getToken(),
                    url_img_user: user.getImg(),
                    actif_user: user.getActif(),
                    creation_date_user: user.getCreationDate(),
                    modification_date_user: user.getModificationDate()
                };

                ctx.session.auth = auth;
                ctx.body = new Body(200, "Connexion réussie", auth);
                return;
            }
        } else {
            ctx.body = new Body(400, "Impossible de se connecter avec ces identifiants");
            return;            
        }
    }

    /**
     * Permet de supprimer la session de l'utilisateur
     * @param {Context} ctx 
     */
    public async disconnectUser (ctx: Context): Promise<void> {
        ctx.session = null;
        ctx.body = new Body(200, "À bientôt !");
    }

    /**
     * Envoie un mail de réinitialisation de mot de passe à l'utilisateur
     * @param {Context} ctx 
     */
    public async getPasswordResetMail (ctx: Context): Promise<void> {
        const mail: string = ctx.request.body.email;

        const currUser: User|null = await this._manager.getUserByMail(mail);

        if (currUser !== null) {
            if (currUser.getActif() === 1) {
                const mailer: Mailer = new Mailer(
                    currUser.getEmail(), 
                    'Réinitialisation de votre mot de passe TurnStyle', 
                    `
                    <div>
                        <h2>Votre demande de réinitialisation de mot de passe</h2>
                        <p>
                            <a href="${process.env.SERVER_FRONT}/auth/${currUser.getToken()}">Merci de cliquer sur ce lien pour réinitialiser votre mot de passe !</a>
                        </p>
                    </div>
                    `
                );
                
                const sent: boolean = await mailer.sendMail();
                const status: number = sent ? 200 : 400;
                const message: string = sent 
                    ? "Un mail de réinitialisation vous a été envoyé" 
                    : "Nous n'avons pas pu vous envoyer un mail de réinitialisation";
                ctx.body = new Body(status, message);
                return;
            } else {
                ctx.body = new Body(400, "Vous ne pouvez pas réinitialiser votre mot de passe car vous n'avez pas de compte actif sur notre plateforme");
                return;
            }
        } else {
           ctx.body = new Body(400, "Si cet email existe sur notre plateforme, vous recevrez un mail de réinitialisation");
           return;
        }
    }

    public async deleteUser (ctx: Context): Promise<void> {
        const idUser: number = Number(ctx.params.idUser);
        if (!Auth.isValid(ctx, idUser)) {
            ctx.body = new Body(403, "Vous n'avez pas accès à ce contenu");
            return;
        }

        const del: boolean = await this._manager.deleteUserById(idUser);
        const status: number = del ? 200 : 400;
        const message: string = del 
            ? "Votre compte a bien été supprimé" 
            : "Il y a eu un problème lors de la suppression de votre compte, merci de réessayer"
        ctx.session = null;
        ctx.body = new Body(status, message);
        return;
    }
}
