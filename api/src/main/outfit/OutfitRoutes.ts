import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { OutfitController } from './OutfitController';

// Initialisation du router de Koa et du controller des tenues
const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: OutfitController = new OutfitController();

// Ajouter une tenue
router.post(
    '/api/outfit/add', 
    async (ctx: Context): Promise<void> => await controller.createOutfit(ctx)
);

// Récupération de toutes les tenues d'un utilisateur
router.get(
    '/api/user/:idUser/outfit/all', 
    async (ctx: Context): Promise<void> => await controller.getAllOutfitByUser(ctx)
);

// Suppression d'une tenue
router.delete(
    '/api/user/:idUser/outfit/delete/:idOutfit', 
    async (ctx: Context): Promise<void> => await controller.deleteOutfit(ctx)
);

// Mise à jour d'une tenue
router.patch(
    '/api/outfit/update', 
    async (ctx: Context): Promise<void> => await controller.updateOutfit(ctx)
);

// Génération d'une tenue :)
router.post('/api/outfit/generate', async (ctx: Context): Promise<void> => await controller.generateRandomOutfit(ctx));

export default router;