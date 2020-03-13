var models = require('../models');

class testController {
    /**
     * test
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async showAll(ctx: any) {

        try {
            const TestAll = await models.Test.findAll();

            if (TestAll) {
                ctx.body = {
                    status: 0,
                    messages: 'good',
                    data: TestAll,
                };
            } else {
                ctx.body = {
                status: -1,
                messages: 'shit',
                };
            }
        } catch (err) {
            ctx.body = {
                status: -1,
                messages: err,
            };
        }
    }
}

export default testController;