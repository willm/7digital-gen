'use strict';

let createApi = require('../releases');
let it = main();
//pass iterator to module.
let api = createApi(it);

//generator function to run calls
function* main () {
    let release = yield api.releases.getDetails({releaseId: 12345});
    console.log(release);
}

//initiate generator
it.next();
