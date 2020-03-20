import * as Router from 'koa-router';
import * as Koa from 'koa';

const router = new Router();

router.get('/api/inscription', async (ctx: Koa.Context) => {
	ctx.body = 'Hello, World!';
});

export default router;