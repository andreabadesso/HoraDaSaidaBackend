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
        mockSchool          = null,
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

                            // Creating mock User
                            models.User.create({
                                username: 'test',
                                password: 'test',
                                name: 'Test User'
                            }).then(function(user) {
                                mockUser = user;
                                // Creating mock School
                                models.School.create({
                                    'name': 'St. Patrick School'
                                }).then(function(school) {
                                    mockSchool = school;
                                    school.addUser(user);
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
         * Tests
         */

        it('should return all users from a school', function(done) {
            request(API_ENDPOINT + 'school/' + mockSchool.id + '/users')
                .then(function(body) {
                    var data = JSON.parse(body);
                    Array.isArray(data).should.equal(true);
                    done();
                });
        });

    });

}());

