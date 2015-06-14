'use strict';
let { expect } = require('chai');
let _ = require('lodash');

describe('', () => {
    let api;
    beforeEach(() => {
        let schema = {
            resources: {
                Releases: {
                    resource: 'release',
                    actions: [
                        {
                            apiCall: "details",
                            methodName: "getDetails"
                        }
                    ]
                },
                Artists: {
                    resource: 'artist',
                    actions: [
                        {
                            apiCall: "search",
                            methodName: "searchArtists"
                        }
                    ]
                }
            }
        };
        api = createSchema(schema);
    });

    it('creates an object for every resource', () => {
        expect(api.release).to.be.a('object');
        expect(api.artist).to.be.a('object');
    });

    it('creates a function for every action', () => {
        expect(api.artist.searchArtists).to.be.a('function');
        expect(api.release.getDetails).to.be.a('function');
    });
    it('proxies the 7digital api functions', () => {
        
    });
});

function createSchema (schema) {
    return _.reduce(schema.resources, (api, resource) => {
        let builtResource = {};
        _.each(resource.actions, (action) => {
           builtResource[action.methodName] = function () {};
        });
        api[resource.resource] = builtResource;
        return api;
    }, {});
}
