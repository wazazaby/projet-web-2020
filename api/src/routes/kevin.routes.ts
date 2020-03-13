import * as Router from 'koa-router';
import { TestController } from '../controller/TestController' ;

const router = new Router()

router.get('/api/kevin', async ctx => {
  ctx.body = ctx;
});

router.get('/api/test', async ctx => {
    const testCtrl = new TestController();
    ctx.body = await testCtrl.showAll();
});

export default router