(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash');

    router.get('/', function(req, res, next) {
        res.send('Wow');
    });

    /**
     * @api {get} /api/me GetUserInformation
     *
     * @apiName GetUserInformation
     * @apiGroup API
     *
     * @apiDescription Get token user information. Requires
     * the user to have a valid token.
     */
    router.get('/me', function(req, res, next) {
        res.send(req.user);
    });

    /**
     * @api {get} /api/me/route GetUserRouteInformation
     *
     * @apiName GetUserRouteInformation
     * @apiGroup API
     *
     * @apiDescription Get token route information. Requires
     * the user to have a valid token.
     */
    router.get('/me/route', function(req, res, next) {
        var id = req.user.id;

        models.User.find({
            where: {
                id: id
            }
        }).then(function(user) {
            if (!user) {
                return next({
                    'status': 500,
                    'message': 'Could not find the user\'s Route'
                });
            }
            user.getUserOnRoute()
                .then(function(usersOnRoute) {
                    res.send(usersOnRoute);
                });
        }, function(err) {
            return next({
                'status': 500,
                'message': 'Could not find the user\'s Route'
            });
        });
    });

    /**
     * @api {post} /api/me/position UpdateUserPosition
     *
     * @apiName UpdateUserPosition
     * @apiGroup API
     *
     * @apiParam {Float} latitude User current Latitude
     * @apiParam {Float} longitude User current Longitude
     *
     * @apiDescription Get token user's current position and updates it.
     * Requires the user to have a valid token.
     */
    router.post('/me/position', function(req, res, next) {
        var id = req.user.id;

        models.User.find({
            where: {
                id: id
            }
        }).then(function(user) {
            if (!user) {
                return next({
                    'status': 500,
                    'message': 'Could not find the user\'s route'
                });
            }
            user.getUserOnRoute()
                .then(function(userOnRoute) {

                    if (!userOnRoute) {
                        return next({
                            'status': 500,
                            'message': 'Could not find the user\'s route2'
                        });
                    }

                    var keys = ['latitude', 'longitude'];
                    _.each(keys, function(key) {
                        if (req.body.hasOwnProperty(key)) {
                            userOnRoute.setDataValue(key, req.body[key]);
                        }
                    });

                    userOnRoute.save()
                        .then(function(userOnRoute) {
                            // Update user distance to school:
                            // userOnRoute.updateDistance();
                            res.send(userOnRoute);
                        });
                });

        }, function(err) {
            return next({
                'status': 500,
                'message': 'Could not find the user\'s children'
            });
        });
    });

    /**
     * @api {post} /api/me/route UpdateUserRoute
     *
     * @apiName UpdateRoute
     * @apiGroup API
     *
     * @apiParam {Integer} ETA Estimated Time to Arrival
     * @apiParam {Integer} distance Distance to the School
     * in meters.
     * @apiParam {String} message A message to the School
     * @apiParam {Float} latitude User current Latitude
     * @apiParam {Float} longitude User current Longitude
     *
     * @apiDescription Get token route information and udpdates it.
     * Requires the user to have a valid token.
     */
    router.post('/me/route', function(req, res, next) {
        var id = req.user.id;

        models.User.find({
            where: {
                id: id
            }
        }).then(function(user) {
            if (!user) {
                return next({
                    'status': 500,
                    'message': 'Could not find the user\'s route'
                });
            }
            user.getUserOnRoute()
                .then(function(userOnRoute) {

                    if (!userOnRoute) {
                        return next({
                            'status': 500,
                            'message': 'Could not find the user\'s route2'
                        });
                    }

                    _.each(Object.keys(userOnRoute.dataValues), function(key) {
                        if (req.body.hasOwnProperty(key)) {
                            userOnRoute.setDataValue(key, req.body[key]);
                        }
                    });

                    userOnRoute.save()
                        .then(function(userOnRoute) {
                            res.send(userOnRoute);
                        });
                });
        }, function(err) {
            return next({
                'status': 500,
                'message': 'Could not find the user\'s children'
            });
        });
    });

    /**
     * @api {get} /api/me/children GetUserChildren
     *
     * @apiName GetUserChildren
     * @apiGroup API
     *
     * @apiDescription Get current User's children
     * Requires the user to have a valid token.
     */
    router.get('/me/children', function(req, res, next) {
        var id = req.user.id;
        models.User.find({
            where: {
                id: id
            }
        }).then(function(user) {
            if (user) {
                user.getChildren()
                    .then(function(children) {
                        res.send(children);
                    });
            } else {
                return next({
                    'status': 500,
                    'message': 'Could not find the user\'s children'
                });
            }
        }, function(err) {
            return next({
                'status': 500,
                'message': 'Could not find the user\'s children'
            });
        });
    });

    module.exports = router;
}());
