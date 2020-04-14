import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { GarmentController } from './GarmentController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: GarmentController = new GarmentController();

// Récupération de tout les vetements pour un user
router.get('/api/user/:idUser/garment/all', async (ctx: Context): Promise<void> => await controller.getAllGarmentsByIdUser(ctx));

export default router;