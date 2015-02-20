(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        _               = require('lodash'),
        async           = require('async');

    var server          = null;

    var models = require('../../models');

    describe('Children Models', function() {
        beforeEach(function(done) {
            models.sequelize.sync({ force: true })
                .then(function() {
                    models.User.create({
                        username: 'test',
                        password: 'test',
                        name: 'Test User'
                    }).then(function() {
                        done();
                    }, function(err) {
                        done(err);
                    });
                }, function(err) {
                    done(err);
                });
        });

        /*
        * Destroy the server
        */
        after(function(done) {
            models.sequelize.sync({ force: true })
                .then(function() {
                    models.User.create({
                        username: 'test',
                        password: 'test',
                        name: 'Test User'
                    }).then(function() {
                        done();
                    }, function(err) {
                        done(err);
                    });
                }, function(err) {
                    done(err);
                });
        });

        it('should create a children on the database', function(done) {
            models.Children.create({
                'name': 'Laura',
                'age': 14,
                'class': '302B'
            }).then(function(child) {
                child.getUsers()
                    .then(function(users) {
                        console.log('users => ', users);
                        done();
                    });
            }, function(err) {
                done(err);
            });
        });

        it('should register a children to the mock user', function(done) {
            models.User.find({
                where: {
                    username: 'test'
                }
            }).then(function(user) {

                if (!user) {
                    done(new Error('Could not find the mock user'));
                }

                models.Children.create({
                    'name': 'Laura',
                    'age': 14,
                    'class': '302B'
                }).then(function(kid) {
                    user.addChildren(kid);
                    done();
                });

            }, function(err) {
                done(err);
            });
        });

    });

}());
