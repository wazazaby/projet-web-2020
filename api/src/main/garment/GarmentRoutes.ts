import * as Router from 'koa-router';
import { Context, DefaultState } from 'koa';
import { GarmentController } from './GarmentController';
import { IncomingMessage } from 'http';

const router: Router<DefaultState, Context> = new Router<DefaultState, Context>();
const controller: GarmentController = new GarmentController();
const multer = require('@koa/multer');

// Type placeholder pour l'image
type File = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
};

// Création de l'upload et du storage pour les images
const upload: any = multer({ 
    storage: multer.diskStorage({

        // Le dossier de déstination
        destination: './uploads',
    
        // Le nom du fichier => timestamp + nom-du-fichier (whitespace remplacés par '-', lowercase)
        filename: (request: IncomingMessage, file: File, callback: Function) => callback(null, `${Date.now()}-${file.originalname.replace(/\s/g, '-').toLowerCase()}`)
    })
});

// Récupération de tout les vetements pour un user
router.get('/api/user/:idUser/garment/all', async (ctx: Context): Promise<void> => await controller.getAllGarmentsByIdUser(ctx));

// Ajout d'un vêtement
router.post('/api/garment/add', upload.single('url_img_garment'), async (ctx: Context): Promise<void> => await controller.createGarment(ctx));

// Suppression d'un garment
router.delete('/api/user/:idUser/garment/delete/:idGarment', async (ctx: Context): Promise<void> => await controller.deleteGarment(ctx));

// Mise à jour d'un garment
router.patch('/api/garment/update', upload.single('url_img_garment'), async (ctx: Context): Promise<void> => await controller.updateGarment(ctx));

export default router;