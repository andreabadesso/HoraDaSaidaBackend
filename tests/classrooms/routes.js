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
        mockClassroom   = null,
        API_ENDPOINT    = 'http://localhost:3001/',
        server          = null;

    describe('DepartureTime Routes', function() {

        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    models.sequelize.sync({ force: true })
                        .then(function() {
                            models.Classroom.create({
                                name: 'test class'
                            }).then(function(classroom) {
                                mockClassroom = classroom;
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

        it('should return an array of all the classrooms on the database', function(done) {
            request(API_ENDPOINT + 'classroom')
                .then(function(body) {
                    var data = JSON.parse(body);
                    Array.isArray(data).should.equal(true);
                    done();
                });
        });

        it('should return an array with the mock classroom departure times', function(done) {
            request(API_ENDPOINT + 'classroom/' + mockClassroom.id + '/departure_times')
                .then(function(body) {
                    var data = JSON.parse(body);
                    Array.isArray(data).should.equal(true);
                    done();
                });
        });

        it('should create an classroom', function(done) {
            request.put(API_ENDPOINT + 'classroom', {
                json: true,
                resolveWithFullResponse: true,
                body: {
                    'name': '302D'
                }
            })
            .then(function(res) {
                res.statusCode.should.equal(200);
                done();
            }, function(err) {
                done(err);
            });
        });
    });

}());

