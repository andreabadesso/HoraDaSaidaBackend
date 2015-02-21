module.exports = function (sequelize, DataTypes) {
    'use strict';

    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        latitude: DataTypes.FLOAT,
        longitude: DataTypes.FLOAT
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsToMany(models.Children, {
                    through: 'UserChildren'
                });
                User.hasOne(models.UserOnRoute);
                User.belongsTo(models.School);
            }
        }
    });

    return User;
};
