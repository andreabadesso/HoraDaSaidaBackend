module.exports = function (sequelize) {
    'use strict';

    return {
        User: require('./user')(sequelize),
        Children: require('./children')(sequelize)
    };
};
