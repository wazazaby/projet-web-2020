import * as Router from 'koa-router';
const router = new Router()

router.get('/api/', async ctx => {
  ctx.body = 'Hello, World!';
})

router.get('/api/users', async ctx => {
    ctx.body = [
        {
            'pseudo': 'Max',
            'age': 32,
            'passions': [
                'fishing',
                'video games',
                'running'
            ],
            'premium': false,
            'lastLoggin': '12-10-2019'
        },
        {
            'pseudo': 'Nicolas',
            'age': 19,
            'passions': [
                'rugby',
                'music'
            ],
            'premium': false,
            'lastLoggin': '21-11-2019'
        },
        {
            'pseudo': 'Perceval',
            'age': 25,
            'passions': [
                'watching crappy movies',
                'super meat boy',
                'being a bitch'
            ],
            'premium': true,
            'lastLoggin': '25-12-2019'
        }
    ];
});

export default router