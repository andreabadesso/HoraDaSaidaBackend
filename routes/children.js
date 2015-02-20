(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        sequelize   = require('../db').sequelize,
        models      = require('../models')(sequelize);

    router.put('/', function(req, res, next) {
        models.Children.create(req.body)
            .then(function(child) {
                //res.send('porra');
                res.send(child.getUsers());
                //res.send(child);
            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Server error.'
                });
            });
    });

    module.exports = router;
}());
