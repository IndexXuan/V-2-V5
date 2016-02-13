/*******************************************************
    > File Name: chain.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月02日 星期二 18时56分53秒
 ******************************************************/

var topone = "top-level";
(function outter() {
	var middle = "mid-level";

	(function inner() {
		var bottom = "bot-level";

		console.log(topone + " > " + middle + " > " + bottom);
	})();
})();

