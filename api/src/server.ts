import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';

import rootRouter from '../routes/test.routes';
import kevinRouter from '../routes/kevin.routes';

const app = new Koa();

// Utilisation du Cross Origin Ressource Sharing et du logger de Koa
app.use(cors());
app.use(logger());






// ---------- ROUTES ----------
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(kevinRouter.routes());
app.use(kevinRouter.allowedMethods());
// ---------- ROUTES ----------






// Lancement du serveur sur le port 3000
app.listen(3000);
console.log('Server running on port 3000');