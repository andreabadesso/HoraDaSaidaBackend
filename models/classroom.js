module.exports = function (sequelize, DataTypes) {

    'use strict';

    var Classroom = sequelize.define('Classroom', {
        'name': DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Classroom.hasMany(models.Children);
                Classroom.belongsToMany(models.DepartureTime, {
                    through: 'ClassroomDepartureTime'
                });
                Classroom.belongsTo(models.School);
            }
        }
    });

    return Classroom;
};
