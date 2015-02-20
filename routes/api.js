(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        sequelize   = require('../db').sequelize,
        models      = require('../models')(sequelize);

    router.get('/', function(req, res, next) {
        res.send('Wow');
    });

    router.get('/me', function(req, res, next) {
        res.send(req.user);
    });

    router.get('/me/children', function(req, res, next) {

        models.Children.findAll()
            .then(function(kids) {
                var kid = kids[0];
                res.send(kid.getUsers());
            });

    /*
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
        });*/
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
