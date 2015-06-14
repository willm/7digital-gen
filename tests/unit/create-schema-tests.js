'use strict';
let { expect } = require('chai');
let _ = require('lodash');

describe('', () => {
    let api;
    let sd;
    let expectedErr = new Error('boom');
    let expectedRes = {release: {id: '1234'}};
    let expectedParams = {releaseId: 1234};
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
        sd = {};
        sd.Releases = function () {};
        sd.Releases.prototype.getDetails = function(params, cb){
            expect(params).to.deep.equal(expectedParams);
            cb(expectedErr, expectedRes);
        };
        api = createSchema(schema, sd);
    });

    it('creates an object for every resource', () => {
        expect(api.release).to.be.a('object');
        expect(api.artist).to.be.a('object');
    });

    it('creates a function for every action', () => {
        expect(api.artist.searchArtists).to.be.a('function');
        expect(api.release.getDetails).to.be.a('function');
    });
    it('proxies the 7digital api functions', (done) => {
        api.release.getDetails(expectedParams, (err, res) => {
            expect(err).to.deep.equal(expectedErr);
            expect(res).to.deep.equal(expectedRes);
            done();
        });
    });
});

function createSchema (schema, sd) {
    let api = {};
    _.forIn(schema.resources, (resource, key) => {
        let builtResource = {};
        _.each(resource.actions, (action) => {
            builtResource[action.methodName] = function (params, cb) {
                new sd[key]()[action.methodName](params, cb);
            };
        });
        api[resource.resource] = builtResource;
    });
    return api;
}