(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../../app.js'),
        request         = require('request-promise'),
        _               = require('lodash');

    var models          = require('../../models');

    var sessionCookie       = null,
        mockUserOnRoute     = null,
        mockUser            = null,
        API_ENDPOINT        = 'http://localhost:3001/',
        server              = null;

    chai.use(chaiAsPromised);
    chai.should();

    describe('API', function() {

        /*
         * Setup the server
         */
        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    // Creating mock user on route
                    models.UserOnRoute.create({
                        'ETA': 1424427266000,
                        'distance': 8205,
                        'message': ''
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
                }
            });
        });

        /*
         * Destroy the server
         */
        after(function(done) {
            server.close();
            done();
        });

        it('should fail to access /api without a valid token', function(done) {
            request(API_ENDPOINT + 'api', { resolveWithFullResponse: true })
                .then(function(res) {
                    done(new Error('Accessed restricted area.'));
                }, function(res) {
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('should return a token on successful login', function(done) {
            request.post(API_ENDPOINT + 'users/login', {
                json: true,
                body: {
                    'username': 'test',
                    'password': 'test'
                }
            }).then(function(body) {
                body.token.should.not.equal(undefined);
                sessionCookie = body.token;
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should use the token to get user current route object', function(done) {
            request({
                uri: API_ENDPOINT + 'api/me/route',
                method: 'GET',
                resolveWithFullResponse: true,
                headers: {
                    'Authorization': 'Bearer ' + sessionCookie
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                var data = JSON.parse(res.body);
                (typeof data).should.equal('object');
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should update the user current route object distance', function(done) {
            request({
                uri: API_ENDPOINT + 'api/me/route',
                method: 'POST',
                resolveWithFullResponse: true,
                json: true,
                body: {
                    'distance': 2830
                },
                headers: {
                    'Authorization': 'Bearer ' + sessionCookie
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                (typeof res.body).should.equal('object');
                res.body.distance.should.equal(2830);
                done();
            }, function(err) {
                done(err);
            });
        });

    });

}());
