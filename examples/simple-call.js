'use strict';

let createApi = require('..');
let iterator = main();
//pass iterator to module.
let api = createApi(iterator);

//generator function to run calls
function* main () {
    let release = yield api.release.getDetails({releaseId: 12345});
    console.log(release);
}

//initiate generator
iterator.next();
