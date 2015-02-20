(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../../app.js'),
        request         = require('request-promise'),
        _               = require('lodash'),
        async           = require('async');

    var models          = require('../../models');

    var sessionCookie   = null,
        API_ENDPOINT    = 'http://localhost:3001/',
        server          = null;

    describe('User Routes', function() {

        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    models.sequelize.sync({ force: true })
                        .then(function() {
                            models.User.create({
                                username: 'test',
                                password: 'test',
                                name: 'Test User'
                            }).then(function(user) {
                                done();
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
        * Tests
        */

        it('should return an array with all the users on the database', function(done) {
            request(API_ENDPOINT + 'users')
                .then(function(body) {
                    var data = JSON.parse(body);
                    Array.isArray(data).should.equal(true);
                    done();
                });
        });

        it('should return an array of users with at least the username', function(done) {
            request(API_ENDPOINT + 'users')
                .then(function(body) {
                    console.log(body);
                    var data = JSON.parse(body);
                    Object.keys(data[0]).should.contain('username');
                    done();
                });
        });

        it('should make sure the returned array doesn\'t contain user passwords', function(done) {
            request(API_ENDPOINT + 'users')
                .then(function(body) {
                    var data = JSON.parse(body);
                    _.each(data, function(user) {
                        Object.keys(user).should.not.contain('password');
                    });
                    done();
                });
        });

        /*
        * Login tests:
        */

        it('should login correctly when passing a correct user/password combination', function(done) {
            request.post(API_ENDPOINT + 'users/login', {
                json: true,
                body: {
                    'username': 'test',
                    'password': 'test'
                }
            }).then(function(body) {
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should fail when passing an incorrect user/password combination', function(done) {
            request.post(API_ENDPOINT + 'users/login', {
                json: true,
                body: {
                    'username': 'thisisretarded',
                    'password': 'therewillneverbeanuserwiththispassword'
                }
            }).then(function(body) {
                done(new Error('The login went successfully'));
            }, function(err) {
                done();
            });
        });

        it('should fail when passing an correct username but incorrect password', function(done) {
            request.post(API_ENDPOINT + 'users/login', {
                json: true,
                body: {
                    'username': 'test',
                    'password': 'therewillneverbeanuserwiththispassword'
                }
            }).then(function(body) {
                done(new Error('The login went successfully'));
            }, function(err) {
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

        it('should access a restricted area with the token', function(done) {
            request({
                uri: API_ENDPOINT + 'api',
                method: 'GET',
                resolveWithFullResponse: true,
                headers: {
                    'Authorization': 'Bearer ' + sessionCookie
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should match the token user with the mock user', function(done) {
            request({
                uri: API_ENDPOINT + 'api/me',
                method: 'GET',
                resolveWithFullResponse: true,
                headers: {
                    'Authorization': 'Bearer ' + sessionCookie
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                var data = JSON.parse(res.body);
                data.username.should.equal('test');
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should return token user children information', function(done) {
            request({
                uri: API_ENDPOINT + 'api/me/children',
                method: 'GET',
                resolveWithFullResponse: true,
                headers: {
                    'Authorization': 'Bearer ' + sessionCookie
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                var data = JSON.parse(res.body);
                Array.isArray(data).should.equal(true);
                done();
            }, function(err) {
                done(err);
            });
        });
    });

}());
