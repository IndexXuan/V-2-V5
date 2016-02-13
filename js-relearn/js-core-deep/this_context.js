/*******************************************************
    > File Name: this_context.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月02日 星期二 19时10分14秒
 ******************************************************/

var global = this;
var tom = {
	name: "Tom",
	home: "desine",
	getInfo: function() {
		console.log(this.name + ", from " + this.home);
	}
};

tom.getInfo(); // Tom, from desine

var jerry = {
	name: "Jerry", 
	getInfo: tom.getInfo
};

jerry.getInfo(); // Jerry, from undefined

global.getInfo = tom.getInfo;
global.getInfo(); // undefined, from undefined

