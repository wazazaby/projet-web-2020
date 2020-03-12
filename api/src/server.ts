import * as Koa from 'koa';
import * as Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('/api', async ctx => {
    ctx.body = 'Hello, World!';
});

router.get('/bonjour', async context => {
    const obj: any = [
        {
            'userId': 34,
            'identity': {
                'name': 'Teddy',
                'surname': 'Sommavilla',
                'age': 21,
                'localisation': 'Grenoble'
            },
            'stuff': [
                'yes',
                'no',
                'maybe',
                'I dont know',
                'can you repeat the question?'
            ]
        },
    ];

    context.body = obj;
});

app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');