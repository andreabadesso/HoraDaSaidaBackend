module.exports = function (sequelize) {
    'use strict';

    var Sequelize = require('sequelize');

    var Children = sequelize.define('Children', {
        'name': Sequelize.STRING,
        'class': Sequelize.STRING,
        'age': Sequelize.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                console.log('Associating Children with User');
                Children.belongsToMany(models.User, {
                    through: 'UserChildren'
                });
            }
        }
    });

    return Children;
};
