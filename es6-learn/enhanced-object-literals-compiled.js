'use strict';

var _obj;

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var obj = _obj = _defineProperty({
    // __proto__
    __proto__: theProtoObj,
    // Shorthand for 'handler: handler'
    handler: handler,
    // Methods
    toString: function toString() {
        // Super calls
        return 'd ' + _get(Object.getPrototypeOf(_obj), 'toString', this).call(this);
    }
}, 'prop_' + (function () {
    return 42;
})(), 42);
// Computed (dynamic) property names
