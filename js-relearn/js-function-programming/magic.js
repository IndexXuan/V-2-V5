/*******************************************************
    > File Name: magic.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月02日 星期二 16时08分40秒
 ******************************************************/

// Base functions
function abs(x) {
	return x > 0 ? x : -x;
}
function add(a, b) {
	return a + b;
}
function sub(a, b) {
	return a - b;
}
function mul(a, b) {
	return a * b;
}
function div(a, b) {
	return a / b;
}
function rem(a, b) {
	return a % b;
}
function inc(x) {
	return x + 1;
}
function dec(x) {
	return x - 1;
}
function equal(a, b) {
	return a == b;
}
function great(a, b) {
	return a > b;
}
function less(a, b) {
	return a < b;
}
function negative(x) {
	return x < 0;
}
function positive(x) {
	return x > 0;
}
function sin(x) {
	return Math.sin(x);
}
function cos(x) {
	return Math.cos(x);
}

// 函数的不动点
function fixedPoint(fx, first) {
	var tolerance = 0.00001;
	function closeEnough(x, y) { return less( abs( sub(x, y) ) , tolerance) };
	function Try(guess) { // try是js关键字,因此此处用大写
		var next = fx(guess);
		//console.log(next + " " + guess);
		if (closeEnough(guess, next)) {
			return next;
		} else {
			return Try(next);
		}
	};
	return Try(first);
}

function sqrt(x) {
	return fixedPoint(
		function(y) {
			return function(a, b) { return div(add(a, b), 2); }(y, div(x, y));
		},
		1.0
	);
}
console.log(sqrt(100));

