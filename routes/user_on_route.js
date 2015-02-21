(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

    /**
     * @api {get} /users_on_route/:id FindUsersOnRoute
     *
     * @apiName FindUsersOnRoute
     * @apiGroup UserOnRoute
     *
     * @apiParam {Number} id User identifier
     *
     * @apiDescription Finds all Users currently on Route
     */
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

    /**
     * @api {put} /users_on_route/:id CreateAndAssociateToUser
     * @apiName CreateAndAssociateToUser
     * @apiGroup UserOnRoute
     *
     * @apiParam {Number} id User identifier
     * @apiParam {Integer} ETA Estimated Time to Arrival
     * @apiParam {Integer} distance Distance to the School
     * in meters.
     * @apiParam {String} message A message to the School
     * @apiParam {Float} latitude User current Latitude
     * @apiParam {Float} longitude User current Longitude
     *
     * @apiDescription Create a departure time and
     * associates it to an User
     */
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
