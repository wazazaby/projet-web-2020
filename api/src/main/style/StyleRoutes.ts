import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { StyleController } from './StyleController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: StyleController = new StyleController();

// Recuperation de tout les styles
router.get('/api/style/all', async (ctx: Context): Promise<void> => await controller.getAllStyle(ctx));


export default router;