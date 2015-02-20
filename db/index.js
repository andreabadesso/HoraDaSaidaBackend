(function() {
    'use strict';

    var Sequelize = require('sequelize'),
        path      = require('path');

    var dbUser          = '',
        dbPassword      = '',
        dbName          = '',
        dbOptions       = { dialect: 'sqlite'};
    if ('test' === process.env.NODE_ENV) {
        dbOptions.storage = path.join(__dirname, 'test');
    } else {
        dbOptions.storage = path.join(__dirname, 'devel');
    }

    var sequelize = new Sequelize(dbUser, dbPassword, dbName, dbOptions),
        models = require('../models')(sequelize);

    Object.keys(models).forEach(function(modelName) {
        if ('associate' in models[modelName]) {
            models[modelName].associate(models);
        }
    });


    exports.sequelize = sequelize;

}());
