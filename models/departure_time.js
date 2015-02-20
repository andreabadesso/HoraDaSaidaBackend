module.exports = function (sequelize, DataTypes) {

    'use strict';

    var DepartureTime = sequelize.define('DepartureTime', {
        'time': DataTypes.BIGINT
    }, {
        classMethods: {
            associate: function(models) {
                DepartureTime.belongsToMany(models.Classroom, {
                    through: 'ClassroomDepartureTime'
                });
                DepartureTime.hasMany(models.UserOnRoute);
            }
        }
    });

    return DepartureTime;
};
