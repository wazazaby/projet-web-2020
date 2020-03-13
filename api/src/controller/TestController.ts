var models = require('../models');
import {ReturnModel} from '../interfaces/ReturnModel.interface';

// Toujours Majuscule + CamelCase sur nom nom de classes
class TestController {

    constructor () {

    }

    // Retourne une Promise de type ReturnModel (l'interface de retour implémentée dans le dossier interfaces)
    async showAll (): Promise<ReturnModel> {
        let tabReturn: ReturnModel = {
            success: true,
            type: 'notice',
            messages: [],
            data: {}
        };

        // try {
        //     const getAllTest: object[] = await models.Test.findAll();

        //     if (getAllTest.length > 0) {
        //         tabReturn.data = getAllTest;
        //     } else {
        //         tabReturn.messages.push('Aucun résultats');
        //     }
        // } catch (err) {
        //     tabReturn.success = false;
        //     tabReturn.type = 'exception';
        //     tabReturn.messages.push(err);
        // }

        return tabReturn;
    }
}

export default TestController;