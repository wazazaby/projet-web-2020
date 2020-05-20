import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { OutfitController } from './OutfitController';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: OutfitController = new OutfitController();

// Ajouter une tenue
router.post('/api/outfit/add', async (ctx: Context): Promise<void> => await controller.createOutfit(ctx));

// Récupération de tout les outfit d'un user
router.get('/api/user/:idUser/outfit/all', async (ctx: Context): Promise<void> => await controller.getAllOutfitByUser(ctx));

// Suppression d'un outfit
router.delete('/api/user/:idUser/outfit/delete/:idOutfit', async (ctx: Context): Promise<void> => await controller.deleteOutfit(ctx));

// Mise à jour d'une tenue
router.patch('/api/outfit/update', async (ctx: Context): Promise<void> => await controller.updateOutfit(ctx));

// Génération d'une tenue :)
router.post('/api/outfit/generate', async (ctx: Context): Promise<void> => await controller.generateRandomOutfit(ctx));

export default router;