"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _libMath = require("lib/math");

var math = _interopRequireWildcard(_libMath);

var _libMathplusplus = require("lib/mathplusplus");

var _libMathplusplus2 = _interopRequireDefault(_libMathplusplus);

alert(" 2pi = " + math.sum(math.pi, math.pi));

alert(" 2pi = " + (0, _libMathplusplus2["default"])(_libMathplusplus.e) * _libMathplusplus.pi * 2);
