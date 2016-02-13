/*******************************************************
    > File Name: array_remove.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 08时24分51秒
 ******************************************************/

// By John Resig ( MIT Licensed )
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};

Array.remove = function(array, from, to) {
	var rest = array.slice((to || from) + 1 || array.length);
	array.length = from < 0 ? array.length + from : from;
	return array.push.apply(array, rest);
};

var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
console.log(array);
array.remove(3);
console.log(array);
array.remove(4, 5);
console.log(array);
Array.remove(array, 1);
console.log(array);
Array.remove(array, 6, 7);
console.log(array);

