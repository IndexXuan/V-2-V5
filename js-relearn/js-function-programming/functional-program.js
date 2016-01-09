/*******************************************************
    > File Name: functional-program.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 16时15分06秒
 ******************************************************/

var outter = function() {
	var x = 0;
	return function() {
		return x++;
	}
}

var a = outter();
console.log(a()); // 0
console.log(a()); // 1

var b = outter();
console.log(b()); // 0
console.log(b()); // 1

// 匿名函数 lambda
function func() {
	// do something...
}

var func = function() {
	// do something...
}

var mapped = [1, 2, 3, 4, 5, 6].map(function(x) { return x * 2 });
console.log(mapped);

// 高阶函数
Array.prototype.map = Array.prototype.map || function(func) {
	var len = this.length;
	if (typeof func != "function") {
		throw new Error("argument should be a function");
	}

	var res = [];
	var obj = arguments[1];
	for (var i = 0; i < len; i++) {
		res[i] = func.call(obj, this[i], i, this);
	}

	return res;
}

function double(x) {
	return x = x * 2;
}

[1, 2, 3, 4, 5].map(double); // return [2, 4, 6, 8, 10]

[1, 2, 3, 4, 5].map(function(x) {
	return x * 2;
});

[
	{id: "item1"},
	{id: "item2"},
	{id: "item3"}
].map(function(current) {
	console.log(current.id);
});
// item1
// item2
// item3



