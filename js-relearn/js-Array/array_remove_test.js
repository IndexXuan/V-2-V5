/*******************************************************
  > File Name: array_remove_test.js
  > Author: IndexXuan
  > Mail: indexxuan@gmail.com
  > Created Time: 2015年06月01日 星期一 08时53分48秒
 ******************************************************/

Array.prototype.remove = function(from, to) {
	var reverse = false;
	if (from <= 0 && to <= 0) { //　支持负坐标from, to
		reverse = true;
		this.reverse();
		from = -from;
		to = -to;
	}
	// 获取后半部分数组, 因为从后数的话就没有-0,故不需要坐标迁移
	var rest = this.slice((to || from) + (!reverse ? 1 : 0) || this.length); 
	this.length = from < 0 ? this.length + from : from; //　获取前半部分
	if (reverse) this.length--; // 原因同上
	var ret = this.push.apply(this, rest); // it is typeof Number... what a fuck! but need this line
	console.log(" ret is: " +ret);
	return !reverse ? ret : this.reverse();
};

Array.remove = function(array, from, to) {
	if (from <= 0 && to <= 0) {
		var reverse = true;
		array.reverse();
		from = -from;
		to = -to;
	}
	var rest = array.slice((to || from) + (!reverse ? 1 : 0) || array.length);
	array.length = from < 0 ? array.length + from : from;
	if (reverse) array.length--;
	var ret = array.push.apply(array, rest);
	return !reverse ? ret : array.reverse();
};


// test
var arr = [1, 2, 3, 4, 5, 6];
arr.remove(2);
console.log(arr); // [1, 2] 
arr.remove(3, 4);
console.log(arr);

var arr2 = [1, 2, 3, 4, 5];
arr2.remove(-1, -4);
console.log(arr2); // [2, 3] 

var arr3 = [1, 2, 3, 4, 5, 6];
Array.remove(arr3, 1);
console.log(arr3);
Array.remove(arr3, 2, 3);
console.log(arr3);
Array.remove(arr3, -1, -2);
console.log(arr3);


