import * as Router from 'koa-router';
import { Context } from 'koa';

// Controller
import { CreateColor } from './Controller/CreateColor';
import { GetColors } from './Controller/getAllColor';

const router = new Router();
const API_COLOR = '/api/color';

// Recupére toute les couleurs
router.post(`${API_COLOR}/all`, async (ctx: Context) => {
    const acc: GetColors = new GetColors(ctx);
    await acc.getColors();
});

// Ajoute une couleur
router.post(`${API_COLOR}/add`, async (ctx: Context) => {
    const acc: CreateColor = new CreateColor(ctx);
    await acc.getResult();
});

export default router;