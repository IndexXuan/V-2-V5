/*******************************************************
    > File Name: debounce.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月24日 星期三 14时23分25秒
 ******************************************************/

var debounce = function(fn, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			if (!immediate) {
				timeout = null;
				fn.apply(context, args);
			}
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		var timeout = setTimeout(later, wait);
		if (callNow) fn.apply(context, args);
	}
}

// 用法
var myEfficientFn = debounce(function() {
	// 所有繁重的操作
    // alert(1);
}, 2500);

window.addEventListener('resize', myEfficientFn);

