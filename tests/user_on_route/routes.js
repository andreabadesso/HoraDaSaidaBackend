(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../../app.js'),
        request         = require('request-promise'),
        _               = require('lodash'),
        async           = require('async');

    var models          = require('../../models');

    var sessionCookie       = null,
        mockDepartureTime   = null,
        mockUserOnRoute     = null,
        mockUser            = null,
        API_ENDPOINT        = 'http://localhost:3001/',
        server              = null;

    describe('UserOnRoute Routes', function() {

        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    models.sequelize.sync({ force: true })
                        .then(function() {

                            // Creating mock user on route
                            models.UserOnRoute.create({
                                'ETA': 1424427266000,
                                'distance': 8205,
                                'message': '',
                                'latitude': -43.78,
                                'longitude': -23.72
                            }).then(function(userOnRoute) {
                                if (!userOnRoute) {
                                    done(new Error('Unable to create User On Road'));
                                }

                                mockUserOnRoute = userOnRoute;

                                // Creating mock user
                                models.User.create({
                                    username: 'test',
                                    password: 'test',
                                    name: 'Test User'
                                }).then(function(user) {
                                    mockUser = user;
                                    userOnRoute.setUser(user);
                                    done();
                                }, function(err) {
                                    done(err);
                                });
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
         * Tests
         */

        it('should return all users currently on route.', function(done) {
            request(API_ENDPOINT + 'users_on_route')
                .then(function(body) {
                    var data = JSON.parse(body);
                    Array.isArray(data).should.equal(true);
                    done();
                });
        });

        it('should create a user route and associate to the mock user', function(done) {
            request.put(API_ENDPOINT + 'users_on_route/user/' + mockUser.id, {
                json: true,
                resolveWithFullResponse: true,
                body: {
                    'ETA': 1424427266000,
                    'distance': 8205,
                    'message': '',
                    'latitude': -43.78,
                    'longitude': -23.72
                }
            }).then(function(res) {
                res.statusCode.should.equal(200);
                done();
            });
        });

    });

}());

