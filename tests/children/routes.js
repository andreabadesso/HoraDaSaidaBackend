(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../../app.js'),
        request         = require('request-promise'),
        _               = require('lodash');

    var models          = require('../../models');

    var sessionCookie   = null,
        API_ENDPOINT    = 'http://localhost:3001/',
        server          = null,
        mockUser        = null,
        mockChildren    = null;

    describe('User Routes', function() {

        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    models.sequelize.sync({ force: true })
                        .then(function() {
                            // Creating mock Children
                            models.User.create({
                                'username': 'test',
                                'password': 'test',
                                'name': 'Test User'
                            }).then(function(user) {
                                mockUser = user;

                                // Creating mock Children
                                models.Children.create({
                                    'name': 'Test Child',
                                    'age': 13,
                                    'class': '302B'
                                }).then(function(children) {
                                    mockChildren = children;
                                    done();
                                }, function(err) {
                                    done(err);
                                });

                            }, function(err) {
                                done(err);
                            });
                        });
                }
            });
        });

        after(function(done) {
            models.sequelize.sync({ force: true })
                .then(function() {
                    server.close();
                    done();
                }, function(err) {
                    server.close();
                    done(err);
                });
        });

        /*
         * Create
         */

        it('should create a new Children', function(done) {
            request.put(API_ENDPOINT + 'children', {
                json: true,
                resolveWithFullResponse: true,
                body: {
                    'name': 'Raquel',
                    'age': 14,
                    'class': '302B'
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should create a children and associate it to the mock user', function(done) {
            request.put(API_ENDPOINT + 'children/user/' + mockUser.id, {
                json: true,
                resolveWithFullResponse: true,
                body: {
                    'name': 'Raquel',
                    'age': 14,
                    'class': '302B'
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                done();
            }, function(err) {
                done(err);
            });
        });

        /*
         * Edit
         */

        it('should edit the mock children\'s name', function(done) {
            request.post(API_ENDPOINT + 'children/' + mockChildren.id, {
                json: true,
                resolveWithFullResponse: true,
                body: {
                    'name': 'Edited Children'
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                res.body.name.should.equal('Edited Children');
                done();
            }, function(err) {
                done(err);
            });
        });

        /*
         * Delete
         */

        it('should delete the mock children', function(done) {
            request(API_ENDPOINT + 'children/' + mockChildren.id, {
                method: 'DELETE',
                resolveWithFullResponse: true
            })
            .then(function(res) {
                res.statusCode.should.equal(200);

                request(API_ENDPOINT + 'children/' + mockChildren.id, {
                    resolveWithFullResponse: true
                }).then(function(res) {
                    done(new Error('Children still exists.'));
                }, function(res) {
                    res.statusCode.should.equal(404);
                    done();
                });
            }, function(err) {
                done(err);
            });
        });

    });

}());
