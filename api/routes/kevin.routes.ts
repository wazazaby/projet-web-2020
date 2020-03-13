import * as Router from 'koa-router';
import test from '../controller/testController' ;

const router = new Router()

router.get('/api/kevin', async (ctx, next) => {
  ctx.body = {
      'kevin': 'bonjour',
      'stuff': 1324
  };
});

/**
 * route de test
 * @return données de la table 'test'
 */
router.get('/api/test', test.showAll);

export default router