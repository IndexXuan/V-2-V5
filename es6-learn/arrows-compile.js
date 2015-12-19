/*******************************************************
    > File Name: arrows.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年08月06日 星期四 11时07分31秒
 ******************************************************/

// Expression bodies
'use strict';

var odds = evens.map(function (v) {
    return v + 1;
});
var nums = evens.map(function (v, i) {
    return v + i;
});
var pairs = evens.map(function (v) {
    return { even: v, odd: v + 1 };
});

// Statement bodies
nums.forEach(function (v) {
    if (v % 5 === 0) {
        fives.push(v);
    }
});

// Lexical this
var bob = {
    _name: 'Bob',
    _friends: [],
    printFriend: function printFriend() {
        var _this = this;

        this._friends.forEach(function (f) {
            return console.log(_this._name + ' knows ' + f);
        });
    }
};
