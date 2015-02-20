module.exports = function (sequelize, DataTypes) {

    'use strict';

    var UserOnRoute = sequelize.define('UserOnRoute', {
        'ETA': DataTypes.BIGINT,
        'distance': DataTypes.INTEGER,
        'message': DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                UserOnRoute.belongsTo(models.DepartureTime);
                UserOnRoute.belongsTo(models.User);
            }
        }
    });

    return UserOnRoute;
};
