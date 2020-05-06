import { Context } from 'koa';
import { UserManager } from './UserManager';
import { User } from './UserEntity';
import { InsertReturnInterface } from '@osmo6/models';
import { Mailer } from '../../libs/Mailer';
import { Body } from '../../libs/Body';
import * as RandomString from 'randomstring';
import * as bcrypt from 'bcrypt';

// Type simple pour le contenu de la session
type UserAuth = {
    id_user: number;
    name_user: string;
    email_user: string;
    token_user: string;
    img_user?: string;
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
     * Permet de créer un utilisateur, et d'envoyer le mail d'activation
     * @param {Context} ctx 
     */
    public async createUser (ctx: Context): Promise<void> {

        // En fonction des paramètres passés dans le body de la request, on crée un objet user
        const userPass = await bcrypt.hash(ctx.request.body.pass, this._hash);
        const newUser: User = new User({
            id_user: null,
            name_user: ctx.request.body.name,
            email_user: ctx.request.body.email,
            pass_user: userPass,
            url_img_user: null,
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
                            <a href="http://localhost:3000/api/user/activate/${newUser.getToken()}">Merci de cliquer sur ce lien pour activer votre compte !</a>
                        </p>
                    </div>
                    `
                );

                if (await mailer.sendMail()) {
                    ctx.body = new Body(204, "Un mail d'activation vous a été envoyé");
                } else {
                    ctx.throw(400, "Problème lors de l'envoie du mail d'activation");
                }
            } else {
                ctx.throw(400, 'Problème lors de la création de votre compte, merci de réessayer');
            }
        } else {
            ctx.throw(400, 'Vous avez déjà un compte sur notre plateforme');
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
                if (result.affectedRows === 1) {
                    ctx.body = new Body(200, 'Votre compte a bien été activé', {email: user.getEmail()});
                } else {
                    ctx.throw(400, "Problème lors de l'activation de votre compte, merci de rééssayer");
                }

                // Si son compte est déjà activé, on le redirigera vers la page de login
            } else if (user.getActif() === 1) {
                ctx.throw(300, 'Votre compte à déjà été activé, vous pouvez vous connecter', {email: user.getEmail()});
            }
        } else {
            ctx.throw(400, "Votre lien d'activation n'est pas valide");
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

        if (user === null) {
            ctx.throw(400, 'Impossible de se connecter avec ces identifiants');
        } else {

            // S'il essaye de se connecter mais qu'il n'a pas activer son compte
            if (user.getActif() === 0) {
                ctx.throw(400, "Merci d'activer votre compte pour pouvoir vous connecter");
            } else {

                // Si tout est bon, on renvoit son id, name et email au front et on les passe en variable de session
                const auth: UserAuth = {
                    id_user: user.getId(), 
                    name_user: user.getName(), 
                    email_user: user.getEmail(),
                    token_user: user.getToken(),
                    img_user: user.getImg(),
                    creation_date_user: user.getCreationDate(),
                    modification_date_user: user.getModificationDate()
                };

                ctx.session.auth = auth;
                ctx.body = new Body(200, 'Connexion réussie', auth);
            }
        }
    }

    /**
     * Permet de supprimer la session de l'utilisateur
     * @param {Context} ctx 
     */
    public async disconnectUser (ctx: Context): Promise<void> {
        ctx.session = null;
        ctx.body = new Body(200, 'Vous avez été déconnecté');
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
                            <a href="">Merci de cliquer sur ce lien pour réinitialiser votre mot de passe !</a>
                        </p>
                    </div>
                    `
                );

                if (await mailer.sendMail()) {
                    ctx.body = new Body(204, "Un mail de réinitialisation vous a été envoyé");
                } else {
                    ctx.throw(400, "Problème lors de l'envoie du mail de réinitialisation");
                }
            } else {
                ctx.throw(400, "Vous ne pouvez pas réinitialiser votre mot de passe car vous n'avez pas de compte actif sur notre plateforme")
            }
        } else {
           ctx.throw(400, "Si cet email existe sur notre plateforme, vous recevrez un mail de réinitialisatoin");
        }
    }
}