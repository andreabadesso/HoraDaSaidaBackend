(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash');

    /**
     * @api {get} /classroom FindAllClassrooms
     *
     * @apiName FindAllClassrooms
     * @apiGroup Classroom
     *
     * @apiDescription Finds all Classrooms on the database
     */
    router.get('/', function(req, res, next) {
        models.Classroom.findAll({
            include: [models.DepartureTime]
        }).then(function(classrooms) {
            res.send(classrooms);
        }, function(err) {
            console.log(err);
            return next({
                'status': 500,
                'message': 'Error finding classrooms.'
            });
        });
    });

    /**
     * @api {get} /classroom FindClassroomDepartureTimes
     *
     * @apiName FindClassroomDepartureTimes
     * @apiGroup Classroom
     *
     * @apiParam {Integer} id Classroom id
     *
     * @apiDescription Finds all departure time from a requested Classroom
     */
    router.get('/:id/departure_times', function(req, res, next) {
        var id = parseInt(req.params.id, 10);

        models.Classroom.find({
            where: {
                id: id
            }
        }).then(function(classroom) {

            if (!classroom) {
                return next({
                    'status': 404,
                    'message': 'Error finding classroom.'
                });
            }

            classroom.getDepartureTimes()
                .then(function(departureTimes) {
                    res.send(departureTimes);
                });

        }, function(err) {
            console.log(err);
            return next({
                'status': 404,
                'message': 'Error finding classroom.'
            });
        });
    });

    /**
     * @api {put} /classroom CreateClassroom
     *
     * @apiName CreateClassroom
     * @apiGroup Classroom
     *
     * @apiParam {String} name The classroom name.
     *
     * @apiDescription Create a new Classroom
     */
    router.put('/', function(req, res, next) {
        models.Classroom.create(req.body)
            .then(function(classroom) {
                res.send(classroom);
            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Error while creating classroom.'
                });
            });
    });

    module.exports = router;
}());
