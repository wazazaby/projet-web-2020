var models: any = require('../models');
import { ReturnModel, BasicUserModel } from '../interfaces';

// Toujours Majuscule + CamelCase sur nom nom de classes
export class TestController {
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

        try {
            const getAllTest: Array<BasicUserModel> = await models.Test.findAll();

            if (getAllTest.length > 0) {
                tabReturn.data = getAllTest;
            } else {
                tabReturn.messages.push('Aucun résultats');
            }
        } catch (err) {
            tabReturn.success = false;
            tabReturn.type = 'exception';
            tabReturn.messages.push(err);
        }

        return tabReturn;
    }
}