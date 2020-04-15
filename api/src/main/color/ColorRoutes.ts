import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { ColorController } from './ColorController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: ColorController = new ColorController();

// Recuperation de toutes les couleurs
router.get('/api/color/all', async (ctx: Context): Promise<void> => await controller.getAllColors(ctx));

// Insertion d'une couleur
router.post('/api/color/add', async (ctx: Context): Promise<void> => await controller.createColor(ctx));

// Recupèration d'une couleur
router.get('/api/color&:label_color&:hex_color&:rgb_color', async (ctx: Context): Promise<void> => await controller.getColor(ctx));

export default router;