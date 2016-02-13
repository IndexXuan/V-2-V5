/*******************************************************
    > File Name: tricks.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月03日 星期三 15时34分33秒
 ******************************************************/

// do not use "new" to do something
// create object
var obj = {};

// create array
var arr = [];

// 访问对象的属性
// 动态执行字符串
eval('(' + jscode + ')');

var array = ['apple', 'borland', 'cisco', 'dell'];
for (var i = 0; i < array.length; i++) {
	console.log(array[i]);
}

var obj = {
	a: 'apple',
	b: 'borland',
	c: 'cisco',
	d: 'dell'
};

for (item in obj) {
	console.log(item + " = " + obj[item]);
}
// for...in循环可以用于遍历对象，但是不推荐使用，因为数组对象可能被添加了附加的属性，
// 使用for...in...会将所有的元素和属性都遍历到，这可能并不是我们需要的。
var arr_test1 = ["one", "two", "three", "four"];
array.extern = "external";
for (item in array) {
	console.log(item + " = " + array[item]);
}
// 会把extern属性也打印出来，并不需要。


// fake namespace
//var jscore = jscore || {};
//jscore.util = jscore.util || {};
//jscore.util.common = {
	//raiseError: function(message) {
		//throw new Error(message);
	//},
	//showMessage: function(info) {
		//console.log(info);
	//}
//}

// a better way to use namespace
var __global__ = this;
var jscore = jscore || {};
jscore.util = jscore.util || {};
jscore.util.namespace = function(name) {
	var parent = __global__;
	var array = name.split(".");

	for (var i = 0, len = array.length; i < len; i++) {
		parent[array[i]] = parent[array[i]] || {};
		parent = parent[array[i]];
	}
}

jscore.util.namespace("uikit.ui"); // define new namespace
uikit.ui.showmessage = function(msg) {
	var tag = new Date().toString();
	console.log("[" + tag + "]");
} // one of this namespace method


