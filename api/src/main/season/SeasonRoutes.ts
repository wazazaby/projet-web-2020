import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { SeasonController } from './SeasonController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: SeasonController = new SeasonController();

// Recuperation de toutes les saisons
router.get('/api/season/all', async (ctx: Context): Promise<void> => await controller.getAllSeason(ctx));


export default router;