import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as DotEnv from 'dotenv';

// L'instance de la connexion à la DB
import { Db } from './OCFram/Db';



// --------------- IMPORT ROUTES ---------------
import userRooter from './ORM/User/user.routes';
// --------------- IMPORT ROUTES ---------------



const app = new Koa();

// Setup des variables d'env
DotEnv.config();



// Utilisation du Cross Origin Ressource Sharing et du logger de Koa (permet de checker les retour de requêtes sur l'API)
app.use(cors());
app.use(logger());

// Permet de parse les données envoyées en POST
app.use(bodyParser());



// ---------- ROUTES ----------
app.use(userRooter.routes());
app.use(userRooter.allowedMethods());
// ---------- ROUTES ----------



// Lancement du serveur sur le port 3000 et log l'adresse de l'API pour que ce soit moins chiant
app.listen(process.env.SERVER_PORT, async () => {
    console.log(`http://localhost:${process.env.SERVER_PORT}/api`);
    await Db.init();
});