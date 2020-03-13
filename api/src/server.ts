import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';

import rootRouter from './routes/test.routes';
import kevinRouter from './routes/kevin.routes';

const app = new Koa();
const PORT = 3000;

// Utilisation du Cross Origin Ressource Sharing et du logger de Koa (permet de checker les retour de requêtes sur l'API)
app.use(cors());
app.use(logger());

// ---------- ROUTES ----------
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(kevinRouter.routes());
app.use(kevinRouter.allowedMethods());
// ---------- ROUTES ----------

// Lancement du serveur sur le port 3000 et log l'adresse de l'API pour que ce soit moins chiant
app.listen(PORT);
console.log(`http://localhost:${PORT}/api`);