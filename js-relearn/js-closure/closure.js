/*******************************************************
    > File Name: closure.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 15时03分59秒
 ******************************************************/

var outter = [];
function clouseTest() {
	var array = ["one", "two", "three", "four", "five"];
	for (var i = 0; i < array.length; i++) {
		var x = {};
		x.no = i;
		x.text = array[i];
		x.invoke = function() {
			console.log(i);
		}
		outter.push(x);
	}
}

console.log(outter[0].invoke());
console.log(outter[1].invoke());
console.log(outter[2].invoke());
console.log(outter[3].invoke());

function clouseTest2() {
	var array = ["one", "two", "three", "four"];
	for (var i = 0; i < array.length; i++) {
		var x = {};
		x.no = i;
		x.text = array[i];
		x.invoke = function(no) {
			return function() {
				console.log(no);
			}
		}(i);
		outter.push(x);
	}
}
// 相当于
// x == 0
x.invoke = function() { console.log(0); }
// x == 1
x.invoke = function() { console.log(1); }
// x == 2
x.invoke = function() { console.log(2); }
// x == 3
x.invoke = function() { console.log(3); }

var CacheSearchBox = (function() {
	var cache = {},
		count = [];
	return {
		attachSearchBox: function(dsid) {
			if (dsid in cache) {
				return cache[dsid]; // 直接返回缓存中的对象
			}
			var fsb = new uikit.webctrl.SearchBox(dsid); // new created
			Cache[dsid] = fsb;
			if (count.length > 100) {
				delete cache[count.shift()];
			}
			return fsb;
		},

		clearSearchBox: function() {
			if (dsid in cache) {
				cache[dsid].clearSearchBox();
			}
		}
	};
})();

CacheSearchBox.attachSearchBox("input1");

// 实线封装
var person = function() {
	var name = "default";

	return {
		getName: function() {
			return name;
		},
		setName: function(newName) {
			name = newName;
		}
	}
}();

console.log(person.name);      // 直接访问,结果为undefined
console.log(person.getName()); // default
person.setName("IndexXuan");   // set name
console.log(person.getName()); // IndexXuan

function Person() {
	var name = "default";

	return {
		getName: function() {
			return name;
		},
		setName: function(newName) {
			name = newName;
		}
	}
}

var john = Person();
console.log(john.getName()); // default
john.setName("john");
console.log(john.getName()); // john

var jack = Person();
console.log(jack.getName()); // default 
jack.setName("jack");
console.log(jack.getName()); // jack


