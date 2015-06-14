'use strict';
let createApi = require('../../releases');
let { expect } = require('chai');

describe('7digital-gen', () => {
    describe('a sucessful call', () => {
        it('should call the api', (done) => {
            let api;
            function* getRelease () {
                let releaseResponse = yield api.
                    release.
                    getDetails({ releaseId: 12345});
                expect(releaseResponse.release.id).to.equal('12345');
                done();
            }
            let iterator = getRelease();
            api = createApi(iterator);
            iterator.next();
        });
    });
    describe('a api error', () => {
        it('throws an error', (done) => {
            let api;
            function* getRelease () {
                try {
                    let releaseResponse = yield api.
                        release.
                        getDetails({ releaseId: 0});
                } catch (err) {
                    expect(err).to.be.defined;
                    done();
                }
            }
            let iterator = getRelease();
            api = createApi(iterator);
            iterator.next();
        });
    });
});
