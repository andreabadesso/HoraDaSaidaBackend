(function() {
    'use strict';

    var express     = require('express'),
        _           = require('lodash'),
        app         = require('../app'),
        router      = express.Router(),
        jwt         = require('jsonwebtoken'),
        redis       = require('redis'),
        redisClient = redis.createClient();

    var models      = require('../models');

    router.get('/connected', function(req, res, next) {
        redisClient.get('userList', function(err, reply) {
            if (err) {
                return next({
                    'status': 500,
                    'message': 'Could not get the list of connected users.'
                });
            }

            if (reply) {
                res.send(JSON.parse(reply));
            } else {
                return next({
                    'status': 500,
                    'message': 'Could not get the list of connected users.'
                });
            }
        });
    });

    /**
     * @api {get} /users/:id FindUserById
     *
     * @apiName FindUserById
     * @apiGroup User
     *
     * @apiParam {Number} id User identifier
     *
     * @apiDescription Finds User by its unique identifier.
     */
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
                'name',
                'latitude',
                'longitude'
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

    /**
     * @api {get} /users/ FindAllUsers
     *
     * @apiName FindAllUsers
     * @apiGroup User
     *
     * @apiDescription Finds all Users currently on database
     */
    router.get('/', function(req, res) {
        models.User.findAll({
            include: [
                models.Children
            ],
            attributes: [
                'id',
                'username',
                'name',
                'latitude',
                'longitude'
            ]
        })
        .then(function(users) {
            res.send(users);
        });
    });

    /**
     * @api {put} /users/ CreateUser
     *
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiParam {String} name The User's name
     * @apiParam {String} username The User's username
     * @apiParam {String} password The User's password
     *
     * @apiDescription Creates a new User
     */
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

    /**
     * @api {post} /users/login Login
     *
     * @apiName Login
     * @apiGroup User
     *
     * @apiParam {String} username User username in plain text
     * @apiParam {String} password User password in plain text
     *
     * @apiSuccessExample {json} Success-Response:
     *      HTTP/1.1 200 OK
     *      {
     *          "token": "JWTTOKEN"
     *      }
     * @apiDescription Exchange username and password for a JWT Token
     */
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
