(function() {
    'use strict';

    var express     = require('express'),
        router      = express.Router(),
        models      = require('../models'),
        _           = require('lodash');

    /**
     * @api {get} /children/:id FindChildrenById
     *
     * @apiName FindChildrenById
     * @apiGroup Children
     *
     * @apiDescription Finds a Children by its unique identifier
     */
    router.get('/:id', function(req, res, next) {

        var id = parseInt(req.params.id, 10);

        models.Children.find({
            where: {
                id: id
            }
        }).then(function(children) {
            if (!children) {
                return next({
                    'status': 404,
                    'message': 'Could not find the requested Children.'
                });
            }
            res.send(children);
        }, function(err) {
            console.log(err);
            return next({
                'status': 500,
                'message': 'Server error.'
            });
        });
    });

    /**
     * @api {get} /children FindAllChildren
     *
     * @apiName FindAllChildren
     * @apiGroup Children
     *
     * @apiDescription Finds all the children on the database
     */
    router.get('/', function(req, res, next) {
        models.Children.findAll()
            .then(function(children) {
                res.send(children);
            }, function(err) {
                console.log(err);
                return next({
                    'status': 500,
                    'message': 'Server error.'
                });
            });
    });

    /**
     * @api {put} /children CreateChildren
     *
     * @apiName CreateChildren
     * @apiGroup Children
     *
     * @apiParam {String} name Children name
     * @apiParam {String} class Children class
     * @apiParam {Integer} age Children age
     * @apiParam {String} picture Children picture
     * @apiParam {String} status Children status
     *
     * @apiDescription Create a Children on the database.
     */
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

    /**
     * @api {put} /children/user/:id CreateChildrenAndAssociateToUser
     *
     * @apiName CreateChildrenAndAssociateToUser
     * @apiGroup Children
     *
     * @apiParam {Integer} id User id
     *
     * @apiParam {String} name Children name
     * @apiParam {String} class Children class
     * @apiParam {Integer} age Children age
     * @apiParam {String} picture Children picture
     * @apiParam {String} status Children status
     *
     * @apiDescription Create a Children on the database and associates it
     * to an user
     */
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

    /**
     * @api {delete} /children/:id DeleteChildren
     *
     * @apiName DeleteChildren
     * @apiGroup Children
     *
     * @apiParam {Integer} id Children id
     *
     * @apiDescription Deletes a Children from the database.
     */
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

    /**
     * @api {post} /children/:id UpdateChildren
     *
     * @apiName UpdateChildren
     * @apiGroup Children
     *
     * @apiParam id Children id
     *
     * @apiParam {String} name Children name
     * @apiParam {String} class Children class
     * @apiParam {Integer} age Children age
     * @apiParam {String} picture Children picture
     * @apiParam {String} status Children status
     *
     * @apiDescription Updates a Children.
     */
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
