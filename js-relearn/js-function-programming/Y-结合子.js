/*******************************************************
    > File Name: Y-结合子.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月02日 星期二 15时39分15秒
 ******************************************************/

/**
 * lambda 演算的先驱们，天才的发现了一个神奇的函数，称为Y－结合子.使用结合子，使用Y-结合子，可以做到对匿名函数
 * 使用递归，关于结合子的发现和推到过程已经超出了本部分的范围，有兴趣的同学可以参考附录中的资料，我们来看看这个神奇
 * 的结合子
 * */

var Y = function(f) {
	return (function(g) {
		return g(g);
	})(function(h) {
		return function() {
			return f(h(h)).apply(null, arguments);
		};
	});
};

var factorial = Y(function(func) {
	return function(x) {
		return x == 0 ? 1 : x * func(x - 1);
	}
});

var result1 = factorial(10);
console.log(result1);

// or 
Y(function(func) {
	return function(x) {
		return x == 0 ? 1 : x * func(x - 1);
	}
})(10);

// easy-way
var fact = function(x) {
	return x == 0 ? 1 : x * arguments.callee(x - 1);
}

var result2 = fact(10);
console.log(result2);

(function(x) {
	return x == 0 ? 1 : x * arguments.callee(x - 1);
})(10); // 3628800

