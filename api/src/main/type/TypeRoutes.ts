import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { TypeController } from './TypeController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: TypeController = new TypeController();

// Recuperation de toutes les types de vêtement
router.get('/api/type/all', async (ctx: Context): Promise<void> => await controller.getAllType(ctx));


export default router;