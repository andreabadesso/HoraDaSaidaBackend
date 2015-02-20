(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash');

    router.get('/', function(req, res, next) {
        res.send('Wow');
    });

    router.get('/me', function(req, res, next) {
        res.send(req.user);
    });

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

    function getMethods(obj) {
        var result = [];
        for (var id in obj) {
            try {
                if (typeof(obj[id]) == "function") {
                    result.push(id + ": " + obj[id].toString());
                }
            } catch (err) {
                result.push(id + ": inaccessible");
            }
        }

        return result;
    }
}());
