(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash'),
        turf            = require('turf');

    /**
     * @api {put} /school CreateSchool
     *
     * @apiName CreateSchool
     * @apiGroup School
     *
     * @apiParam {String} name
     *
     * @apiDescription Creates a new School
     */
    router.put('/', function(req, res, next) {
        models.School.create(req.body)
            .then(function(school) {
                if (!school) {
                    return next({
                        'status': 500,
                        'message': 'Could not create the school'
                    });
                }

                res.send(school);

            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Error creating school.'
                });
            });
    });

    /**
     * @api {get} /school/:schoolId/distance/:latitude/:longitude
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
    router.get('/:schoolId/distance/:latitude/:longitude',
        function(req, res, next) {
            var schoolId = parseInt(req.params.schoolId, 10);
            var latitude = parseFloat(req.params.latitude, 10);
            var longitude = parseFloat(req.params.longitude, 10);

            models.School.find({
                where: {
                    id: schoolId
                }
            }).then(function(school) {

                if (!school) {
                    return next({
                        'status': 404,
                        'message': 'Could not find the requested school.'
                    });
                }

                var x = turf.point([latitude, longitude]);
                var y = turf.point([school.latitude, school.longitude]);

                var distance = turf.distance(x, y);

                res.send({
                    'status': 200,
                    'message': 'OK',
                    'distance': distance
                });

            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'The school could not be found.'
                });
            });
    });

    /**
     * @api {post} /school/:schoolId/users/:userId AssociateUserToSchool
     *
     * @apiName AssociateUserToSchool
     * @apiGroup School
     *
     * @apiParam {Integer} schoolId The school id
     * @apiParam {Integer} schoolId The user id
     *
     * @apiDescription Associates an User to a School
     */
    router.post('/:schoolId/users/:userId', function(req, res, next) {
        var schoolId = parseInt(req.params.schoolId, 10);
        var userId = parseInt(req.params.userId, 10);

        models.School.find({
            where: {
                id: schoolId
            },
            include: [
                models.User
            ]
        }).then(function(school) {

            if (!school) {
                return next({
                    'status': 404,
                    'message': 'Could not find the requested school.'
                });
            }

            models.User.find({
                where: {
                    id: userId
                }
            }).then(function(user) {

                user.setSchool(school)
                    .then(function() {
                        res.send({
                            'status': 200,
                            'message': 'OK',
                            'user': user,
                            'school': school
                        });
                    });

            }, function(err) {
                return next({
                    'status': 404,
                    'message': 'Could not find the requested user.'
                });
            });

        }, function(err) {
            return next({
                'status': 500,
                'message': 'Could not find the requested school.'
            });
        });
    });

    /**
     * @api {get} /school/:id/users GetSchoolUsers
     *
     * @apiName GetSchoolUsers
     * @apiGroup School
     *
     * @apiParam {Integer} id The school id
     *
     * @apiDescription Get all users from a School
     */
    router.get('/:id/users', function(req, res, next) {
        var id = parseInt(req.params.id, 10);

        models.School.find({
            where: {
                id: id
            }
        }).then(function(school) {
            if (!school) {
                return next({
                    'status': 404,
                    'message': 'Could not find the requested school.'
                });
            }

            school.getUsers()
                .then(function(users) {
                    res.send(users);
                });

        }, function(err) {
            return next({
                'status': 500,
                'message': 'Error finding school.'
            });
        });
    });

    module.exports = router;
}());
