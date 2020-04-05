import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as DotEnv from 'dotenv';
import * as Router from 'koa-router';


// L'instance de la connexion à la DB
import { Db } from './libs/Db';


// --------------- IMPORT ROUTES ---------------
import userRooter from './main/user/UserRoutes';
import colorRooter from './main/color/ColorRoutes';
// --------------- IMPORT ROUTES ---------------


const app = new Koa();
const router = new Router();

// Setup des variables d'env
DotEnv.config();


// Utilisation du Cross Origin Ressource Sharing et du logger de Koa (permet de checker les retour de requêtes sur l'API)
app.use(cors());
app.use(logger());


// Permet de parse les données envoyées en POST
app.use(bodyParser());


// Permet de test si l'API est opérationelle
router.get('/api', async (ctx: Koa.Context): Promise<void> => {
    ctx.body = {msg: ['Hello, World!', 'You\'ve successfully connected to the TurnStyle API']};
});

app.use(router.routes());


// ---------- ROUTES ----------
app.use(userRooter.routes());
app.use(userRooter.allowedMethods());

app.use(colorRooter.routes());
app.use(colorRooter.allowedMethods());
// ---------- ROUTES ----------



// Lancement du serveur sur le port 3000 et log l'adresse de l'API pour que ce soit moins chiant
app.listen(process.env.SERVER_PORT, async () => {
    console.log(`http://localhost:${process.env.SERVER_PORT}/api`);
    await Db.init();
});