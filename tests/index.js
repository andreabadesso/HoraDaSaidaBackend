(function() {
    'use strict';

    process.env.NODE_ENV = 'test';

    var chai            = require('chai'),
        chaiAsPromised  = require('chai-as-promised'),
        app             = require('../app.js'),
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

        it('checks the webserver availability', function(done) {
            request(API_ENDPOINT, { resolveWithFullResponse: true })
                .then(function(res) {
                    res.statusCode.should.equal(200);
                    done();
                });
        });

    });

    // Testing user routes:
    require('./users');
    require('./api');
    require('./children');
    require('./classrooms');
    require('./departuretime');
    require('./user_on_route');
    require('./school');

}());
