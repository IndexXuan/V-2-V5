'use strict';

function timeout() {
    var duration = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

    return new Promise(function (resolve, reject) {
        setTimeout(resolve, duration);
    });
}

var p = timeout(1000).then(function () {
    return timeout(2000);
}).then(function () {
    throw new Error('hmm');
})['catch'](function (err) {
    return Promise.all([timeout(100), timeout(200)]);
});
