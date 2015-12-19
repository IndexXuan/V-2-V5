// list matching
"use strict";

var _ref = [1, 2, 3];
var a = _ref[0];
var b = _ref[2];

// object matching

var _getASTNode = getASTNode();

var a = _getASTNode.op;
var b = _getASTNode.lhs.op;
var c = _getASTNode.rhs;

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope

var _getASTNode2 = getASTNode();

var op = _getASTNode2.op;
var lhs = _getASTNode2.lhs;
var rhs = _getASTNode2.rhs;

// Can be used in parameter position
function g(_ref2) {
    var x = _ref2.name;

    console.log(x);
}
g({ name: 5 });

// Fail-soft destructuring
var _ref3 = [];
var a = _ref3[0];

a === undefined;

// Fail-soft destructuring with defaults
var _ref4 = [];
var _ref4$0 = _ref4[0];
var a = _ref4$0 === undefined ? 1 : _ref4$0;

a === 1;
