import * as Router from 'koa-router';
import { Context } from 'koa';
import { UserController } from './UserController';

const router: Router = new Router();
const controller: UserController = new UserController();

router.post('/api/user/add', async (ctx: Context): Promise<void> => await controller.createUser(ctx));

router.get('/api/user/activate/:token', async (ctx: Context): Promise<void> => await controller.activateUser(ctx));

router.post('/api/user/login', async (ctx: Context): Promise<void> => { ctx.body = {url: 'login'} });

router.get('/api/user/logout', async (ctx: Context): Promise<void> => { ctx.body = {url: 'logout'} });

export default router;