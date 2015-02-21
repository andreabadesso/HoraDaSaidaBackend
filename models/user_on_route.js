module.exports = function (sequelize, DataTypes) {

    'use strict';

    var UserOnRoute = sequelize.define('UserOnRoute', {
        'ETA': DataTypes.BIGINT,
        'distance': DataTypes.INTEGER,
        'message': DataTypes.TEXT,
        'latitude': DataTypes.FLOAT,
        'longitude': DataTypes.FLOAT
    }, {
        classMethods: {
            associate: function(models) {
                UserOnRoute.belongsTo(models.DepartureTime);
                UserOnRoute.belongsTo(models.User);
            }
        },
        hooks: {
            afterUpdate: function(attrs, options, cb) {
                cb();
            }
        }
    });

    return UserOnRoute;
};
