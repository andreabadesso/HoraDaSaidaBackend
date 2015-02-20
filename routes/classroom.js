(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash');

    router.get('/', function(req, res, next) {
        models.Classroom.findAll()
            .then(function(classrooms) {
                res.send(classrooms);
            }, function(err) {
                console.log(err);
                return next({
                    'status': 500,
                    'message': 'Error finding classrooms.'
                });
            });
    });

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

    module.exports = router;
}());
