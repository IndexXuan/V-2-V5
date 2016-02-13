/*******************************************************
    > File Name: oop.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 15时38分57秒
 ******************************************************/

function Base() {
	this.baseFunc = function() {
		console.log("base behaviour");
	}
}

function Middle() {
	this.middleFunc = function() {
		console.log("middle behaviour");
	}
}

Middle.prototype = new Base();

function Final() {
	this.finalFunc = function() {
		console.log("final behaviour");
	}
}

Final.prototype = new Middle();

function test() {
	var obj = new Final();
	obj.baseFunc();
	obj.middleFunc();
	obj.finalFunc();
}

