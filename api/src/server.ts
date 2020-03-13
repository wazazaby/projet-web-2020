import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as logger from 'koa-logger';

import rootRouter from '../routes/test.routes';
import kevinRouter from '../routes/kevin.routes';

const app = new Koa();

app.use(cors());
app.use(logger());

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.use(kevinRouter.routes());
app.use(kevinRouter.allowedMethods());


app.listen(3000);
console.log('Server running on port 3000');