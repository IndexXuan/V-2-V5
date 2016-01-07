/*******************************************************
    > File Name: arraysSimilar.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月16日 星期二 19时24分15秒
 ******************************************************/

/** 
 *  check whether two arrays is similar,
 * 1  the member of the array should be the same type, the order is not required
 * 2  the length of the arrays should be the same
 * 3  should tell the difference between String, Boolean, Number, undefined, null, function, date, and window
 *
 */

//var arr = [1, 2, 3, false, true, '2014-03-03', window, 'aaa'];
//var sorted_arr_object = { "Number": 3, "Function": 0, "Boolean": 2, "date": 1, "window": 1, "String": 1, "undefined": 0, "null": 0 };
function arraysSimilar(arr1, arr2) {

	if ((!arr1 instanceof Array) || (!arr2 instanceof Array)) {
		return false;
	}
	if (arr1.length !== arr2.length) return false;

	var tongji_arr = {
		"Number": 0,
		"Function": 0,
		"Boolean": 0,
		"Date": 0,
		"Window": 0,
		"String": 0,
		"null": 0,
		"undefined": 0
	};

	var tongji_arr1 = tongji_arr;
	var tongji_arr2 = tongji_arr;

	function getType(item) {
		var t;
		if (item === null) t = 'null';
		else if (item instanceof Array) t = 'array';
		else if (item === window) t = 'window';
		else if (item instanceof Date) t = 'date';
		else t = typeof item;
		return t;
	}

	arr1.forEach(function(item) {
		var typeofit = getType(item);
		switch (typeofit) {
			case 'number':
				tongji_arr1.Number++;
			    break;
			case 'function':
				tongji_arr1.Function++;
			    break;
			case 'boolean':
				tongji_arr1.Boolean++;
			    break;
			case 'window':
				tongji_arr1.Window++;
			    break;
			case 'date':
				tongji_arr1.Date++;
			    break;
			case 'string':
				tongji_arr1.String++;
			    break;
			case 'undefined':
				tongji_arr1.undefined++;
			    break;
			case 'null':
				tongji_arr1.null++;
			    break;
		}
	});

	arr2.forEach(function(item) {
		var typeofit = getType(item);
		switch (typeofit) {
			case 'number':
				tongji_arr2.Number++;
			    break;
			case 'function':
				tongji_arr2.Function++;
			    break;
			case 'boolean':
				tongji_arr2.Boolean++;
			    break;
			case 'window':
				tongji_arr2.Window++;
			    break;
			case 'date':
				tongji_arr2.Date++;
			    break;
			case 'string':
				tongji_arr2.String++;
			    break;
			case 'undefined':
				tongji_arr2.undefined++;
			    break;
			case 'null':
				tongji_arr2.null++;
			    break;
		}
	});

	for (prop in tongji_arr1) {
		if (tongji_arr1[prop] !== tongji_arr2[prop]) {
			return false;
		}
		return true;
	}
}

var arr1 = [false, 1, 'saa', 3];
var arr2 = [2, 40, true, 'bbb'];
console.log(arraysSimilar(arr1, arr2)); // true

