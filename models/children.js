module.exports = function (sequelize, DataTypes) {

    'use strict';

    var Children = sequelize.define('Children', {
        'name': DataTypes.STRING,
        'picture': DataTypes.STRING,
        'class': DataTypes.STRING,
        'age': DataTypes.INTEGER,
        'status': DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Children.belongsToMany(models.User, {
                    through: 'UserChildren'
                });
                Children.belongsTo(models.Classroom, {
                    through: 'UserChildren'
                });
            }
        }
    });

    return Children;
};
