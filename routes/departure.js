(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

    router.get('/', function(req, res, next) {
        models.DepartureTime.findAll()
            .then(function(departureTimes) {
                res.send(departureTimes);
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

    module.exports = router;
}());
