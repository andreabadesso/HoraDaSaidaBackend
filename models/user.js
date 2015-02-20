module.exports = function (sequelize, DataTypes) {
    'use strict';

    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                User.belongsToMany(models.Children, {
                    through: 'UserChildren'
                });
            }
        }
    });

    return User;
};
