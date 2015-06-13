'use strict';

let releases = require('./releases');
let it = main();
let releaseMethods = releases(it);

function* main () {
    let release = yield releaseMethods.getDetails({releaseId: 12345});
    console.log(release);
}

it.next();
