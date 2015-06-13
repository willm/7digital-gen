'use strict';

let releases = require('../releases');
let it = main();
//pass iterator to module.
let releaseMethods = releases(it);

//generator function to run calls
function* main () {
    let release = yield releaseMethods.getDetails({releaseId: 12345});
    console.log(release);
}

//initiate generator
it.next();
