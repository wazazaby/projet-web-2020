import * as Router from 'koa-router';
import { Context } from 'koa';
import { CreateAccount } from './Controller/CreateAccount';

const router = new Router();

const API_USER = '/api/user';

router.post(`${API_USER}/inscription`, async (ctx: Context): Promise<void> => {
    const acc: CreateAccount = new CreateAccount(ctx);
    await acc.getResult();
});

router.get(`${API_USER}/activation/:token`, async (ctx: Context): Promise<void> => {});

router.post(`${API_USER}/authentification`, async (ctx: Context): Promise<void> => {});

router.get(`${API_USER}/deconnexion`, async (ctx: Context): Promise<void> => {});

export default router;