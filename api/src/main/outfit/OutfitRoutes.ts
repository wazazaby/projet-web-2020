import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { OutfitController } from './OutfitController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: OutfitController = new OutfitController();

router.post('/api/outfit/add', async (ctx: Context): Promise<void> => controller.createOutfit(ctx));