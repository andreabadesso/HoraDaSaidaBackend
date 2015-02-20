(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash');

    router.put('/', function(req, res, next) {
        models.Children.create(req.body)
            .then(function(child) {
                res.send(child);
            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Server error.'
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
                    'message': 'User not found.'
                });
            }

            models.Children.create(req.body)
                .then(function(child) {
                    user.addChildren(child)
                        .then(function(user) {
                            res.send(child);
                        });
                }, function(err) {
                    return next({
                        'status': 500,
                        'message': 'Server error.'
                    });
                });
        });
    });

    router.delete('/:id', function(req, res, next) {
        var id = parseInt(req.params.id, 10);

        models.Children.find({
            where: {
                id: id
            }
        }).then(function(child) {

            if (!child) {
                return next({
                    'status': 404,
                    'message': 'Child not found.'
                });
            }

            child.destroy()
                .then(function() {
                    res.send({
                        'status': 200,
                        'message': 'OK'
                    });
                }, function(err) {
                    console.log(err);
                    return next({
                        'status': 500,
                        'message': 'Error deleting the child.'
                    });
                });

        });
    });

    router.post('/:id', function(req, res, next) {
        var id = parseInt(req.params.id, 10);

        models.Children.find({
            where: {
                id: id
            }
        }).then(function(child) {

            if (!child) {
                return next({
                    'status': 404,
                    'message': 'Child not found.'
                });
            }

            _.each(Object.keys(child.dataValues), function(key) {
                if (req.body.hasOwnProperty(key)) {
                    child.setDataValue(key, req.body[key]);
                }
            });

            child.save()
                .then(function(child) {
                    res.send(child);
                }, function(err) {
                    console.log(err);
                    return next({
                        'status': 500,
                        'message': 'Error saving the child.'
                    });
                });

        });
    });

    module.exports = router;
}());
