import * as Router from 'koa-router';
import { Context } from 'koa';
import { CreateAccount } from './Controller/CreateAccount';
import { User } from './Entity/User';

const router = new Router();

router.get('/api/inscription', async (ctx: Context) => {
    const acc: CreateAccount = new CreateAccount();
    const test: User = await acc.getResult();
	ctx.body = test;
});

export default router;