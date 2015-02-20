(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        _               = require('lodash'),
        sequelize       = require('../../db').sequelize,
        async           = require('async');

    var server          = null;

    var models = require('../../models')(sequelize);

    describe('User Models', function() {
        beforeEach(function(done) {
            sequelize.sync({ force: true })
                .then(function() {
                    models.User.create({
                        username: 'test',
                        password: 'test',
                        name: 'Test User'
                    }).then(function() {
                        async.each(Object.keys(models), function(key, callback) {
                            if ('associate' in models[key]) {
                                models[key].associate(models);
                                callback();
                            }
                        }, function(err) {
                            if (err) {
                                done(err);
                            } else {
                                done();
                            }
                        });
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
            sequelize.sync({ force: true })
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

        it('should create an user on the database', function(done) {
            models.User.create({
                username: 'postman',
                password: 'postman',
                name: 'User'
            }).then(function() {
                done();
            }, function(err) {
                done(err);
            });
        });

        it('should find the mock user on the database', function(done) {
            models.User.find({
                where: {
                    username: 'test'
                }
            }).then(function(user) {

                if (!user) {
                    done(new Error('Could not find the mock user'));
                }

                done();

            }, function(err) {
                done(err);
            });
        });

        it('should get the mock user from the database and edit its name', function(done) {
            models.User.find({
                where: {
                    username: 'test'
                }
            }).then(function(user) {

                if (!user) {
                    done(new Error('Could not find the mock user'));
                }

                user.name = 'Not Test';
                user.save()
                    .then(function() {
                        done();
                    }, function(err) {
                        done(err);
                    });

            }, function(err) {
                done(err);
            });
        });

    });

}());
