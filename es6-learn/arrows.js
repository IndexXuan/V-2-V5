/*******************************************************
    > File Name: arrows.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年08月06日 星期四 11时07分31秒
 ******************************************************/

// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map( (v, i) => v + i );
var pairs = evens.map(v => ({even: v, odd: v + 1}));

// Statement bodies
nums.forEach(v => {
    if (v % 5 === 0) {
        fives.push(v);
    }
});

// Lexical this
var bob = {
    _name: 'Bob',
    _friends: [],
    printFriend() {
        this._friends.forEach(f => 
            console.log(this._name + ' knows ' + f));
    }
};

