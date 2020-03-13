// Imports
var models = require('../models');

module.exports = {

    showTest: function(req, res)
    {
        models.Test.findAll({
            attributes: ['*'],
            raw: true,
        })
        .then(function(testFound)
        {
            console.log(testFound);

        //     if(testFound)
        //     {
        //         res.status(200).json(testFound);
        //     }
        //     else
        //     {
        //         res.status(500).json({ 'error': "marche pas" });
        //     }
        })
        .catch(function(err)
        {
            // res.status(503).json({ 'error': 'Echec de connexion !' });
        });
    },

}
