(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

    router.get('/', function(req, res, next) {
        models.DepartureTime.findAll({
            include: [models.Classroom]
        }).then(function(departureTimes) {
            res.send(departureTimes);
        }, function(err) {
            return next({
                'status': 500,
                'message': 'Error finding departure times.'
            });
        });
    });

    router.get('/:id', function(req, res, next) {
        var id = parseInt(req.params.id, 10);

        models.DepartureTime.find({
            where: {
                id: id
            },
            include: [models.Classroom]
        }).then(function(departureTime) {
            if (!departureTime) {
                return next({
                    'status': 404,
                    'message': 'Could not find departure time.'
                });
            }

            res.send(departureTime);

        }, function(err) {
            return next({
                'status': 500,
                'message': 'Error finding departure times.'
            });
        });
    });

    router.put('/', function(req, res, next) {
        models.DepartureTime.create(req.body)
            .then(function(departureTime) {
                res.send(departureTime);
            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Error while creating departure time.'
                });
            });
    });

    router.post('/:departureId/classroom/:classroomId', function(req, res, next) {

        var departureId = parseInt(req.params.departureId, 10);
        var classroomId = parseInt(req.params.classroomId, 10);

        models.DepartureTime.find({
            where: {
                id: departureId
            }
        }).then(function(departure) {

            if (!departure) {
                return next({
                    'status': 404,
                    'message': 'Could not find the departure time.'
                });
            }

            models.Classroom.find({
                where: {
                    id: classroomId
                }
            }).then(function(classroom) {
                if (!classroom) {
                    return next({
                        'status': 404,
                        'message': 'Could not find the classroom.'
                    });
                }

                classroom.addDepartureTime(departure)
                    .then(function() {
                        res.send(classroom);
                    }, function(err) {
                        console.log(err);
                        return next({
                            'status': 500,
                            'message': 'Could not associate the departure time with the classroom'
                        });
                    });
            });
        });

    });

    module.exports = router;
}());
