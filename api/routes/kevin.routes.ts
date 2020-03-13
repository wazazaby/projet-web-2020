import * as Router from 'koa-router';
const router = new Router()

router.get('/api/kevin', async (ctx, next) => {
  ctx.body = {
      'kevin': 'bonjour',
      'stuff': 1324
  };
});

export default router