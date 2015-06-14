'use strict';
let api = require('7digital-api');
let schema = require('7digital-api/assets/7digital-api-schema');
let createSchema = require('./create-schema');
let createCallback;


module.exports = function (it) {
    createCallback = function () {
        return function generatorCallback (err, response) {
            if (err) {
                return it.throw(err);
            }
            return it.next(response);
        };
    };
    return createSchema(schema, api, createCallback());
};
