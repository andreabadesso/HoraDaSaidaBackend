(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash'),
        turf        = require('turf');

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
     * @api {get} /school/distance/:latitude/:longitude
     * CalculateDistanceToSchool
     *
     * @apiName CalculateDistanceToSchool
     * @apiGroup School
     *
     * @apiParam {Float} latitude The latitude to compare.
     * @apiParam {Float} longitude The longitude to compare.
     *
     * @apiDescription Compares the school position to a pair of latLng and
     * returns the distance in kilometers.
     */
    router.get('/me/school/distance/:latitude/:longitude',
        function(req, res, next) {
            var schoolId = parseInt(req.params.schoolId, 10);
            var latitude = parseFloat(req.params.latitude, 10);
            var longitude = parseFloat(req.params.longitude, 10);
            var id = req.user.id;

            models.User.find({
                where: {
                    id: id
                },
            }).then(function(user) {
                user.getSchool()
                    .then(function(school) {
                        if (!school) {
                            return next({
                                'status': 404,
                                'message': 'Could not find the logged' +
                                'in user school.'
                            });
                        }

                        var x = turf.point([latitude, longitude]);
                        var y = turf.point([school.latitude, school.longitude]);

                        var distance = turf.distance(x, y);

                        res.send({
                            'status': 200,
                            'message': 'OK',
                            'distance': distance,
                            'schoolPos': {
                                latitude: school.latitude,
                                longitude: school.longitude
                            }
                        });

                    }, function(err) {
                        return next({
                            'status': 500,
                            'message': 'The school could not be found.'
                        });
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
                    'message': 'Could not find the user'
                });
            }

            var keys = ['latitude', 'longitude'];
            _.each(keys, function(key) {
                if (req.body.hasOwnProperty(key)) {
                    user.setDataValue(key, req.body[key]);
                }
            });

            user.save()
                .then(function(user) {
                    var latLng = {
                        latitude: user.latitude,
                        longitude: user.longitude
                    };
                    res.send(latLng);
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
