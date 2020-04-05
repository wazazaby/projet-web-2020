import * as Router from 'koa-router';
import { Context } from 'koa';
import { ColorController } from './ColorController';

const router: Router = new Router();
const controller: ColorController = new ColorController();

// Recupèration de toutes les couleurs
router.get('/api/color/all', async (ctx: Context) => await controller.getAllColors(ctx));

// Insertion d'une couleur
router.post('/api/color/add', async (ctx: Context) => await controller.createColor(ctx));

// Recupèration d'une couleur
router.get('/api/color&:label_color&:hex_color&:rgb_color', async (ctx: Context) => await controller.getColor(ctx));

export default router;