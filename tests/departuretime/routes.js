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
        mockClassroom       = null,
        API_ENDPOINT        = 'http://localhost:3001/',
        server              = null;

    describe('Classroom Routes', function() {

        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    models.sequelize.sync({ force: true })
                        .then(function() {
                            models.DepartureTime.create({
                                time: 1424422169000
                            }).then(function(departure) {
                                mockDepartureTime = departure;
                                models.Classroom.create({
                                    name: 'Mock Class'
                                }).then(function(classroom) {
                                    mockClassroom = classroom;
                                    mockDepartureTime.addClassroom(classroom)
                                        .then(function() {
                                            done();
                                        });
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

        it('should return an array with all the departure times', function(done) {
            request(API_ENDPOINT + 'departure_time')
                .then(function(body) {
                    var data = JSON.parse(body);
                    Array.isArray(data).should.equal(true);
                    done();
                });
        });

        it('should create a new departure time', function(done) {
            request.put(API_ENDPOINT + 'departure_time', {
                json: true,
                resolveWithFullResponse: true,
                body: {
                    'time': 1424427458000
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should associate a DepartureTime with the mock Classroom', function(done) {
            request.post(API_ENDPOINT + 'departure_time/' + mockDepartureTime.id + '/classroom/' + mockClassroom.id, {
                resolveWithFullResponse: true
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                request(API_ENDPOINT + 'departure_time/' + mockDepartureTime.id, {
                    resolveWithFullResponse: true
                }).then(function(res) {
                    res.statusCode.should.equal(200);
                    var data = JSON.parse(res.body);
                    var classrooms = data.Classrooms;
                    if (_.find(classrooms, {'id': mockClassroom.id})) {
                        done();
                    } else {
                        done(new Error('Could not find the related classroom on the departureTime'));
                    }
                });
            }, function(err) {
                done(err);
            });
        });

    });

}());

