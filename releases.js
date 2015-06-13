'use strict';
let Releases = require('7digital-api').Releases;
let createCallback;

function getDetails (parameters) {
    return new Releases().getDetails(parameters, createCallback());
}

module.exports = function (it) {
    createCallback = function () {
        return function generatorCallback (err, response) {
            if (err) {
                return it.throw(err);
            }
            return it.next(response);
        };
    };
    return {
        releases: {
            getDetails: getDetails
        }
    };
};
