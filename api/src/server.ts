import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as DotEnv from 'dotenv';
import * as session from 'koa-session';
import * as serve from 'koa-send';
import * as Router from 'koa-router';

// L'instance de la connexion à la DB
import { Db } from './libs/Db';

// --------------- IMPORT ROUTES ---------------
import userRooter from './main/user/UserRoutes';
import colorRooter from './main/color/ColorRoutes';
import garmentRooter from './main/garment/GarmentRoutes';
import seasonRooter from './main/season/SeasonRoute';
import typeRooter from './main/type/TypeRoute';
import styleRooter from './main/style/StyleRoute';
import brandRooter from './main/brand/BrandRoute';
// --------------- IMPORT ROUTES ---------------

const app: Koa = new Koa();
const router: Router<Koa.DefaultState, Koa.Context> = new Router<Koa.DefaultState, Koa.Context>();
router.get('/uploads/(.*)', async (ctx: Koa.Context): Promise<string> => serve(ctx, ctx.path, { maxAge: 31536000000 }));

// Setup des variables d'environnement
DotEnv.config();

// On passe les cookies secret à l'app
app.keys = [process.env.SECRET1, process.env.SECRET2, process.env.SECRET3];

// Gestion des CORS de l'app
app.use(cors({ 
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

// Utilisation du logger de Koa (pour voir les status des appels à l'API)
app.use(logger());

// Le bodyParser permet de gérer les données envoyées en POST depuis les formulaires
app.use(bodyParser());

// On ajoute la gestion de sessions à Koa, avec un cookie qui dure 1 jour
app.use(session({ maxAge: 86400000 }, app));

// ---------- ROUTES ----------
// Serv static files
app.use(router.routes());
app.use(router.allowedMethods());

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

// Type
app.use(typeRooter.routes());
app.use(typeRooter.allowedMethods());

// Style
app.use(styleRooter.routes());
app.use(styleRooter.allowedMethods());

// Brand
app.use(brandRooter.routes());
app.use(brandRooter.allowedMethods());
// ---------- ROUTES ----------

// Lancement du serveur et initialisation de la BDD
app.listen(process.env.SERVER_PORT, () => console.log(`http://localhost:${process.env.SERVER_PORT}/api/`));
Db.init('http://localhost/phpmyadmin');