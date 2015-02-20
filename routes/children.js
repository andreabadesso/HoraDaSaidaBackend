(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

    router.put('/', function(req, res, next) {
        models.Children.associate(models);
        models.Children.create(req.body)
            .then(function(child) {
                child.getUsers()
                    .then(function(users) {
                        res.send(users);
                    });
            }, function(err) {
                console.log(err);
                return next({
                    'status': 500,
                    'message': 'Server error.'
                });
            });
    });

    module.exports = router;
}());
