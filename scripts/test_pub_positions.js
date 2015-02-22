(function() {
    'use strict';

    var redis           = require('redis'),
        mock            = require('./mock_positions'),
        _               = require('lodash'),
        pubSubClient    = redis.createClient();

    var index = 0;

    /* Message schema:
     * {
     *    "user": {
     *      "id": 1
     *      "latitude": -23.48,
     *      "longitude": -43.28
     *    }
     * }
     */
    var positions = _.map(mock.features, function(feature) {
        return {
            user: {
                id: 1,
                latitude: feature.geometry.coordinates[1],
                longitude: feature.geometry.coordinates[0]
            }
        };
    });

    setInterval(function() {
        pubSubClient.publish('updatePosition',
            JSON.stringify(positions[index]));

        index++;
        if (index === positions.length) {
            index = 0;
        }

    }, 2500);

}());
