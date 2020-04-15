import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { BrandController } from './BrandController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: BrandController = new BrandController();

// Recuperation de toutes les marques de vêtement
router.get('/api/brand/all', async (ctx: Context): Promise<void> => await controller.getAllBrand(ctx));


export default router;