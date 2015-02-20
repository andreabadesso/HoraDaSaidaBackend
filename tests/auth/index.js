(function() {
    'use strict';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../../app.js'),
        request         = require('request-promise'),
        _               = require('lodash');

    var sessionCookie   = null,
        API_ENDPOINT    = 'http://localhost:3001/',
        server          = null;

    chai.use(chaiAsPromised);
    chai.should();

    describe('app settings', function() {

        /*
         * Setup the server
         */
        before(function(done) {
            server = app.listen(3001, function (err, result) {
                if (err) {
                    done(err);
                } else {
                    done();
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

    });

}());
