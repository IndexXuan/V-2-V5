// list matching
var [a, , b] = [1, 2, 3];

// object matching
var { op: a, lhs: { op: b }, rhs: c }
      = getASTNode();

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var {op, lhs, rhs} = getASTNode();

// Can be used in parameter position
function g({name: x}) {
    console.log(x);
}
g({name: 5});

// Fail-soft destructuring
var [a] = [];
a === undefined;

// Fail-soft destructuring with defaults
var [a = 1] = [];
a === 1;

