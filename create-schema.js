'use strict';
let _ = require('lodash');

module.exports = function createSchema (schema, sd, callback) {
    let api = {};
    _.forIn(schema.resources, (resource, key) => {
        let builtResource = {};
        _.each(resource.actions, (action) => {
            builtResource[action.methodName] = function (params, cb) {
                new sd[key]({
                    logger: {
                        info: _.noop,
                        silly: _.noop,
                        error: _.noop,
                        warn: _.noop
                    }
                })[action.methodName](params, callback);
            };
        });
        api[resource.resource] = builtResource;
    });
    return api;
};
