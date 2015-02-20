(function() {
    'use strict';

    var express         = require('express'),
        path            = require('path'),
        favicon         = require('serve-favicon'),
        logger          = require('morgan'),
        cookieParser    = require('cookie-parser'),
        bodyParser      = require('body-parser'),
        expressJwt      = require('express-jwt'),
        jwt             = require('jsonwebtoken'),
        async           = require('async');

    var routes      = require('./routes/index');
    var users       = require('./routes/users');
    var children    = require('./routes/children');
    var api         = require('./routes/api');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/api', expressJwt({ secret: 'supersecretsecret' }));

    app.use('/', routes);
    app.use('/users', users);
    app.use('/api', api);
    app.use('/children', children);

    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.send({
                status: err.status || 500,
                message: err.message
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    /*app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: {}
        });
    });*/

    module.exports = app;
}());
