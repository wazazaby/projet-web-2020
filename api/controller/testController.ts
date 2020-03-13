var models = require('../models');
import {ReturnModel} from '../interfaces/ReturnModel.interface';

class testController {
    /**
     * test
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async showAll(ctx: any) {

        try {
            const allTest = await models.Test.findAll();

            if (allTest) {
                const test: ReturnModel = {
                    success: true,
                    type: 'notice',
                    messages: [],
                    data: allTest
                };

                ctx.body = test;
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