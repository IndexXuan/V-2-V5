/*******************************************************
    > File Name: RestArgs.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年08月06日 星期四 11时20分31秒
 ******************************************************/

function f(x, ...y) {
    // y is an Array
    return x * y.length;
}
console.log( f(3, "hello", true) == 6 );

