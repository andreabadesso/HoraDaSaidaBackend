/*
 * # Socket.IO will receive user add requests on the channel addUser
 *  * It will add the socket to a sockets list
 *  * It will add the user to a user lists and save it to REDIS for persistance
 *
 * # Socket.IO will receive updates about user's position on the channel
 * updatePosition
 *  * It will update the user position on the database.
 *  * It will broadcast the position update on the channel user:positionUpdate
 *
 * # Socket.IO will listen for updates on a REDIS Pub/Sub channel for
 * user updates
 */
module.exports = function(io) {
    'use strict';

    var jwt             = require('jsonwebtoken'),
        _               = require('lodash'),
        models          = require('../models'),
        redis           = require('redis'),
        redisClient     = redis.createClient(),
        pubSubClient    = redis.createClient();

    // A list for the connected users and a list
    // of connected sockets.
    var userList    = [],
        socketList  = [];

    // Get the list of connected users from REDIS:
    redisClient.get('userList', function(err, reply) {
        if (err) {
            console.log('err => ', err);
        } else {
            if (reply) {
                console.log('reply => ', reply);
                userList = JSON.parse(reply);
            }
        }
    });

    pubSubClient.subscribe('updatePosition');

    /* Message schema:
     * {
     *    "user": {
     *      "id": 1
     *      "latitude": -23.48,
     *      "longitude": -43.28
     *    }
     * }
     */
    pubSubClient.on('message', function(channel, message) {
        // Will receive a user position update notice.
        // Will update the user in the userList.
        if (channel === 'updatePosition') {
            var data = JSON.parse(message);
            var user = _.find(userList, { 'id': data.user.id });

            if (user) {
                user.latitude = data.user.latitude;
                user.longitude = data.user.longitude;

                // Persist it on REDIS:
                redisClient.set('userList', JSON.stringify(userList));
            }
        }
    });

    io.on('connection', function(socket) {
        socket.on('addUser', function(data) {
            console.log('User ' + data.user.id + data.user.name + ' connected.');
            // Binds the user information to the socket:
            socket.user = data.user;

            // Checks if the user is in the socketList:
            if (!_.find(socketList, {'id': data.user.id})) {
                console.log('User socket was not on the socket list.');
                socketList.push(socket);
            }

            // Checks if the user is in the userList:
            if (!_.find(userList, {'id': data.user.id})) {
                console.log('User was not on the user list.');
                userList.push(data.user);
            }

            // Updates the userlist on redis
            redisClient.set('userList', JSON.stringify(userList));
        });

        pubSubClient.on('message', function(channel, message) {
            // Will receive a user position update notice.
            // Will broadcast this user position to all the connected clients.
            if (channel === 'updatePosition') {
                var data = JSON.parse(message);
                var user = _.find(userList, {'id': data.user.id});

                if (user) {
                    // Goes through every connected client and emits
                    // the position update
                    _.each(socketList, function(userSocket) {
                        userSocket.emit('user:positionUpdate', {
                            user: user,
                            coords: {
                                latitude: user.latitude,
                                longitude: user.longitude
                            }
                        });
                    });
                }
            }
        });

        function updatePosition(data) {
            var user = jwt.decode(data.token);

            console.log('User: [ID:' + user.id + '] Updating position');
            console.log('position:  ', data.position);

            models.User.find({
                where: {
                    id: user.id
                }
            }).then(function(user) {
                if (!user) return;

                user.latitude = data.position.latitude;
                user.longitude = data.position.longitude;
                user.save()
                    .then(function() {

                        _.each(socketList, function(userSocket) {
                            userSocket.emit('user:positionUpdate', {
                                user: user,
                                coords: {
                                    latitude: user.latitude,
                                    longitude: user.longitude
                                }
                            });
                        });

                        var _user = _.find(userList, {'id': user.id});

                        if (_user) {
                            _user.latitude = user.latitude;
                            _user.longitude = user.longitude;
                        } else {
                            console.log('User not found on the list.');
                        }

                        redisClient.set('userList', JSON.stringify(userList));
                    });
            });
        }

        socket.on('updatePosition', updatePosition);

        socket.on('disconnect', function(data) {
            _.remove(socketList, function(_socket) {
                if (socket.hasOwnProperty('user')) {
                    return _socket.user.id === socket.user.id;
                } else {
                    return false;
                }
            });

            _.remove(userList, function(user) {
                if (socket.hasOwnProperty('user')) {
                    return user.id === socket.user.id;
                } else {
                    return false;
                }
            });

            _.each(socketList, function(userSocket) {
                userSocket.emit('user:removeUser', {
                    user: socket.user
                });
            });

            if (userList) {
                console.log('[ Disconnect ] Connected users => ', userList.length);
            }
            redisClient.set('userList', JSON.stringify(userList));
        });

    });

};
