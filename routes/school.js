(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models');

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
