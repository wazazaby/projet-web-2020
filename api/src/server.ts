import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';
import * as koaBody from 'koa-body';

import rootRouter from './routes/test.routes';

const app = new Koa();
const PORT = 3000;

// Utilisation du Cross Origin Ressource Sharing et du logger de Koa (permet de checker les retour de requêtes sur l'API)
app.use(cors());
app.use(logger());

// Permet de parse les données envoyées en POST
app.use(koaBody());

// ---------- ROUTES ----------
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
// ---------- ROUTES ----------

// Lancement du serveur sur le port 3000 et log l'adresse de l'API pour que ce soit moins chiant
app.listen(PORT);
console.log(`http://localhost:${PORT}/api`);