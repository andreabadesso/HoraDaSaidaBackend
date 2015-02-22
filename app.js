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

    var routes          = require('./routes/index'),
        users           = require('./routes/users'),
        children        = require('./routes/children'),
        classroom       = require('./routes/classroom'),
        api             = require('./routes/api'),
        departureTime   = require('./routes/departure'),
        usersOnRoute    = require('./routes/user_on_route.js'),
        school          = require('./routes/school.js');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // CORS:
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'Authorization, Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
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
    app.use('/classroom', classroom);
    app.use('/departure_time', departureTime);
    app.use('/users_on_route', usersOnRoute);
    app.use('/school', school);

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
