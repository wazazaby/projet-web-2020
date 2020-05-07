import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { UserController } from './UserController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: UserController = new UserController();

// Route de landing pour l'API, ne sert à rien
router.get('/api', async (ctx: Context): Promise<void> => {
    ctx.body = {msg: ['Hello, World!', "You've successfully connected to the TurnStyle API"]};
});

// Ajout d'un utilisateur
router.post('/api/user/add', async (ctx: Context): Promise<void> => await controller.createUser(ctx));

// Activation d'un utilisateur
router.get('/api/user/activate/:token', async (ctx: Context): Promise<void> => await controller.activateUser(ctx));

// Connexion d'un utilisateur
router.post('/api/user/login', async (ctx: Context): Promise<void> => await controller.connectUser(ctx));

// Deconnexion d'un utilisateur
router.get('/api/user/logout', async (ctx: Context): Promise<void> => await controller.disconnectUser(ctx));

// Recevoir un mail de réinitialisation de mot de passe
router.post('/api/user/password-reset', async (ctx: Context): Promise<void> => await controller.getPasswordResetMail(ctx));

// Réinitialisation du mot de passe
router.get('/api/user/password-reset/:token', ctx => ctx.body =  { 'Hello': 'World!' });

// Check de l'authentification de l'user en session
router.post('api/user/verify-auth', ctx => ctx.body = { 'Hello': 'World!' });

export default router;