(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../../app.js'),
        request         = require('request-promise'),
        _               = require('lodash'),
        async           = require('async'),
        turf            = require('turf');

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
                                    'name': 'St. Patrick School',
                                    'latitude': -23.48,
                                    'longitude': -43.49
                                }).then(function(school) {
                                    mockSchool = school;
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

        it('should return the distance between a coordinate to the school',
            function(done) {

                var coordinates = [
                    -23.47,
                    -43.48
                ];

                request(API_ENDPOINT + 'school/' +
                    mockSchool.id + '/distance/' +
                    coordinates[0] + '/' +
                    coordinates[1], {
                    json: true
                })
                .then(function(body) {
                    var x = turf.point(coordinates);
                    var y = turf.point([
                        mockSchool.latitude,
                        mockSchool.longitude
                    ]);

                    var distance = turf.distance(x, y);
                    body.distance.should.equal(distance);
                    done();
                });
        });

        it('add an user to a school', function(done) {
            request.post(API_ENDPOINT + 'school/' + mockSchool.id +
                '/users/' + mockUser.id, {
                    json: true
                }).then(function(body) {

                    (typeof body).should.equal('object');

                    request(API_ENDPOINT + 'school/' +
                        mockSchool.id + '/users')
                        .then(function(body) {

                            var data = JSON.parse(body);
                            Array.isArray(data).should.equal(true);

                            data.length.should.equal(1);
                            _.find(data, {id: mockUser.id})
                                .should.not.equal(undefined);

                            done();
                        });
                });
        });
    });

}());

