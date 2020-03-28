import * as Router from 'koa-router';
import { Context } from 'koa';
import { CreateAccount } from './Controller/CreateAccount';
import { User } from './Entity/User';

const router = new Router();

const API_USER = '/api/user';

// router.get('/api/test/:token', async (ctx: Context) => {
//     const acc: CreateAccount = new CreateAccount();
//     const test: User = await acc.getResult();
//     ctx.body = test;
//     ctx.body = ctx.params;
// });

router.post(`${API_USER}/inscription`, async (ctx: Context) => {
    const acc: CreateAccount = new CreateAccount(ctx);
    await acc.getResult();
});

router.get(`${API_USER}/activation/:token`, async (ctx: Context) => {});

router.post(`${API_USER}/authentification`, async (ctx: Context) => {});

router.get(`${API_USER}/deconnexion`, async (ctx: Context) => {});

export default router;