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
        mockUser        = null;

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
                                mockUser = user;
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
            });
        });

    });

}());
