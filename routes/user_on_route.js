(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

    router.get('/', function(req, res, next) {
        models.UserOnRoute.findAll({
            include: [models.DepartureTime]
        }).then(function(usersOnRoute) {
            res.send(usersOnRoute);
        }, function(err) {
            return next({
                'status': 500,
                'message': 'Error finding users on route.'
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
                    'message': 'Unable to find user.'
                });
            }

            models.UserOnRoute.create(req.body)
                .then(function(userOnRoute) {

                    if (!userOnRoute) {
                        return next({
                            'status': 500,
                            'message': 'Error creating user on route.'
                        });
                    }

                    user.setUserOnRoute(userOnRoute)
                        .then(function() {
                            res.send(userOnRoute);
                        });

                }, function(err) {
                    return next({
                        'status': 500,
                        'message': 'Error creating user on route.'
                    });
                });
        });
    });

    module.exports = router;

}());
