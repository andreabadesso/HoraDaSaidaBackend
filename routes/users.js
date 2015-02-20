(function() {
    'use strict';

    var express     = require('express'),
        _           = require('lodash'),
        app         = require('../app'),
        router      = express.Router(),
        jwt         = require('jsonwebtoken');

    var models      = require('../models');

    router.get('/:id', function(req, res, next) {
        var id = parseInt(req.params.id, 10);

        models.User.find({
            where: {
                id: id
            },
            include: [
                models.Children
            ],
            attributes: [
                'id',
                'username',
                'name'
            ]
        })
        .then(function(user) {
            if (!user) {
                return next({
                    'status': 404,
                    'message': 'User not found.'
                });
            }
            res.send(user);
        });
    });

    router.get('/', function(req, res) {
        models.User.findAll({
            include: [
                models.Children
            ],
            attributes: [
                'id',
                'username',
                'name'
            ]
        })
        .then(function(users) {
            res.send(users);
        });
    });

    router.put('/', function(req, res, next) {
        models.User.create(req.body)
            .then(function(user) {
                res.send(user);
            }, function(err) {
                return next({
                    'status': 500,
                    'message': 'Server error.'
                });
            });
    });

    router.post('/login', function(req, res, next) {

        models.User.find({
            where: {
                username: req.body.username
            }
        }).then(function(user) {

            if (!user) {
                return next({
                    'status': 401,
                    'message': 'Invalid username or password.'
                });
            }

            if (user.password === req.body.password) {
                var token = jwt.sign(user, 'supersecretsecret', { expiresInMinutes: 60*5 });
                res.json({
                    token: token
                });
            } else {
                return next({
                    'status': 401,
                    'message': 'Invalid username or password.'
                });
            }
        });

    });

    module.exports = router;

}());
