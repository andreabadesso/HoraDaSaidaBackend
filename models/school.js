module.exports = function (sequelize, DataTypes) {

    'use strict';

    var School = sequelize.define('School', {
        'name': DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                School.hasMany(models.User);
                School.hasMany(models.Classroom);
            }
        }
    });

    return School;
};
