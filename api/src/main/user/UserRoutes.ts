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

export default router;