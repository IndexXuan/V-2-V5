/*******************************************************
    > File Name: step-by-step-to-functional-programming.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 17时03分01秒
 ******************************************************/

function abs(x) { return x > 0 ? x : -x }
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return a /b; }
function rem(a, b) { return a % b; }
function inc(x) { return x + 1; }
function dec(x) { return x - 1; }
function equal(a, b) { return a == b; }
function great(a, b) { return a > b ? true : false; }
function less(a, b) { return a < b; }
function negative(x) { return x < 0; }
function positive(x) { return x > 0; }
function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }

// n * (n - 1) * (n - 2) * ... * 3 * 2 * 1
function factorial(n) {
	if (n == 1) {
		return 1;
	} else {
		return n * factorial(n - 1);
	}
}

// functional-programming
function factorial(n) {
    if (equal(n, 1)) {
		return 1;
	} else {
		return mul(n, factorial(dec(n)));
	}
}

/***
 * product <- counter * product
 * counter <- counter + 1
 * ***/

function factorial(n) {
	function fact_iter(product, counter, max) {
		if (great(counter, max)) {
			return product;
		} else {
			fact_iter(mul(counter, product), inc(counter), max);
		}
	}

	return fact_iter(1, 1, n);
}

// much more functional...
function factorial(n) {
	return (function factiter(product, counter, max) {
		if (great(counter, max)) {
			return product;
		} else {
			fact_iter(mul(counter, product), inc(counter), max);
		}
	})

	return fact_iter(1, 1, n);
}

factorial(10);

