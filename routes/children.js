(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

    router.put('/', function(req, res, next) {
        models.Children.create(req.body)
            .then(function(child) {
                res.send(child);
            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Server error.'
                });
            });
    });

    router.put('/user/:id', function(req, res, next) {

        var id = parseInt(req.params.id, 10);

        models.User.find({
            where: {
                id: id
            }
        }).then(function(user) {

            if (!user) {
                return next({
                    'status': 404,
                    'message': 'User not found.'
                });
            }

            models.Children.create(req.body)
                .then(function(child) {
                    user.addChildren(child)
                        .then(function(user) {
                            res.send(child);
                        });
                }, function(err) {
                    return next({
                        'status': 500,
                        'message': 'Server error.'
                    });
                });
        });
    });

    module.exports = router;
}());
