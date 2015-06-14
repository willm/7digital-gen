'use strict';
let { expect } = require('chai');
let createSchema = require('../../create-schema');

describe('', () => {
    let api;
    let sd;
    let expectedErr = new Error('boom');
    let expectedRes = {release: {id: '1234'}};
    let expectedParams = {releaseId: 1234};
    let schema;
    beforeEach(() => {
        schema = {
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
        api = createSchema(schema, sd, (err, res) => {
            expect(err).to.deep.equal(expectedErr);
            expect(res).to.deep.equal(expectedRes);
            done();
        });
        api.release.getDetails(expectedParams);
    });
});
