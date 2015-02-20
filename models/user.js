module.exports = function (sequelize) {
    'use strict';

    var Sequelize = require('sequelize');

    var User = sequelize.define('User', {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        classMethods: {
            associate: function(models) {
                console.log('Associating User...')
                User.belongsToMany(models.Children, {
                    through: 'UserChildren'
                });
            }
        }
    });

    return User;
};
