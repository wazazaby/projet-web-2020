import * as Router from 'koa-router';
import { TestController } from '../controller/TestController';

const router = new Router();

// Les routes de test
router.get('/api/', async ctx => {
	ctx.body = 'Hello, World!';
});

router.get('/api/test', async ctx => {
	const testCtrl = new TestController();
	ctx.body = await testCtrl.showAll();
});

router.get('/api/users', async ctx => {
	ctx.body = [
		{
			pseudo: 'Max',
			age: 32,
			passions: ['fishing', 'video games', 'running'],
			premium: false,
			lastLoggin: '12-10-2019'
		},
		{
			pseudo: 'Nicolas',
			age: 19,
			passions: ['rugby', 'music'],
			premium: false,
			lastLoggin: '21-11-2019'
		},
		{
			pseudo: 'Perceval',
			age: 25,
			passions: [
				'watching crappy movies',
				'super meat boy',
				'being a bitch'
			],
			premium: true,
			lastLoggin: '25-12-2019'
		},
		{
			pseudo: 'Humew',
			age: 45,
			passions: [
				'Being right',
				'Having 12 years of experience',
				'Div vide'
				],
			premium: false,
			lastLoggin: '01-01-1970'
	];
});

// En POST, les données envoyées dans le body sont recupérables dans ctx.request.body
router.post('/api/login', async ctx => {
	ctx.body = ctx.request.body;
});

export default router;
