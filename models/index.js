(function() {
    'use strict';

    var fs        = require('fs'),
        path      = require('path'),
        Sequelize = require('sequelize'),
        sequelize = new Sequelize('', '', '', {
            storage: 'test' === process.env.NODE_ENV ? 'test' : 'devel',
            dialect: 'sqlite',
            logging: false
        });


    var db = {
        User: sequelize['import'](__dirname + '/user'),
        Children: sequelize['import'](__dirname + '/children'),
        Classroom: sequelize['import'](__dirname + '/classroom'),
        DepartureTime: sequelize['import'](__dirname + '/departure_time'),
        UserOnRoute: sequelize['import'](__dirname + '/user_on_route'),
        School: sequelize['import'](__dirname + '/school')
    };

    Object.keys(db).forEach(function(modelName) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;
}());
