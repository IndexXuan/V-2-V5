"use strict";

function f1(x) {
    var y = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];

    // y is 12 if not passed( or passed as undefined)
    return x + y;
}
f1(3) == 15;

function f2(x) {
    for (var _len = arguments.length, y = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        y[_key - 1] = arguments[_key];
    }

    // y is an Array
    return x * y.length;
}
f2(3, "hello", true) == 6;

function f3(x, y, z) {
    return x + y + z;
}
// Pass each elem of array as argument
f3.apply(undefined, [1, 2, 3]) == 6;
