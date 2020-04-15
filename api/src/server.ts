import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as DotEnv from 'dotenv';
import * as Router from 'koa-router';
import * as session from 'koa-session';


// L'instance de la connexion à la DB
import { Db } from './libs/Db';


// --------------- IMPORT ROUTES ---------------
import userRooter from './main/user/UserRoutes';
import colorRooter from './main/color/ColorRoutes';
import garmentRooter from './main/garment/GarmentRoutes';
import seasonRooter from './main/season/SeasonRoute';
// --------------- IMPORT ROUTES ---------------


const app: Koa = new Koa();
const router: Router<Koa.DefaultState, Koa.Context> = new Router<Koa.DefaultState, Koa.Context>();

// Setup des variables d'environnement
DotEnv.config();

// Utilisation du Cross Origin Ressource Sharing
app.use(cors());

// Utilisation du logger de Koa (pour voir les status des appels à l'API)
app.use(logger());

// Permet de parse les données envoyées en POST
app.use(bodyParser());

// Utilisation des variables de sessions
app.use(session(app));



// ---------- ROUTES ----------
// User
app.use(userRooter.routes());
app.use(userRooter.allowedMethods());

// Color
app.use(colorRooter.routes());
app.use(colorRooter.allowedMethods());

// Garment
app.use(garmentRooter.routes());
app.use(garmentRooter.allowedMethods());

// Season
app.use(seasonRooter.routes());
app.use(seasonRooter.allowedMethods());
// ---------- ROUTES ----------



// Lancement du serveur sur le port 3000 et log l'adresse de l'API pour que ce soit moins chiant
app.listen(process.env.SERVER_PORT, async (): Promise<void> => {
    console.log(`http://localhost:${process.env.SERVER_PORT}/api`);
    await Db.init();
});