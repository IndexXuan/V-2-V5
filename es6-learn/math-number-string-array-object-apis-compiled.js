"use strict";

Number.EPSILON;
Number.isInteger(Infinity); // false
Number.isNaN("NaN"); // false

Math.acosh(3); // 1.762747
Math.hypot(3, 4); // 5
Math.imul(Math.pow(2, 32) - 1, Math.pow(2, 32) - 2); // 2

"abcde".includes("cd"); // true
"abc".repeat(3); // "abcabcabc"

Array.from(document.querySelectorAll("*")); // returns a real array
Array.of(1, 2, 3); // similar to new Array, but without special one-arg behavior
[0, 0, 0].fill(7, 1) // [0, 7, 7]
[(1, 2, 3)].find(function (x) {
  return x == 3;
}) // 3
[(1, 2, 3)].findIndex(function (x) {
  return x == 2;
}) // 1
[(1, 2, 3, 4, 5)].copyWithin(3, 0) // [1, 2, 3, 1, 2]
[("a", "b", "c")].entries() // iterator [0, "a"], [1, "b"], [2, "c"]
[("a", "b", "c")].keys() // iterator 0, 1, 2
[("a", "b", "c")].values(); // iterator "a", "b", "c"

Object.assign(Point, { origin: new Point(0, 0) });
