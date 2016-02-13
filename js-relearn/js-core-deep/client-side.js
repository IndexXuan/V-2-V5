/*******************************************************
    > File Name: client-side.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月02日 星期二 19时15分03秒
 ******************************************************/

var x = 3;
var str = "global";

(function() {
	var x = 3;
	var str = "global";
})();

function initxhr() {
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		throw new Error("xhr is not supported");
	}
}

function doajax(url, panelId) {
    if (xhr == null) {
		initxhr();
	}

	if (xhr != null) {
		xhr.open("GET", url, true);
		xhr.onreadystatechange = updatePanel(panelId);
		xhr.send(null);
	} else {
		throw new Error("xhr is not inited");
	}
}

function updatePanel(panelId) {
	return function() {
		if (xhr.readyState == 4) {
			var response = xhr.responseText;
			console.log(response);
			document.getElementById(panelId).innerHTML = response;
		}
	}
}

