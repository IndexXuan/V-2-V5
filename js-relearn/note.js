/*******************************************************
    > File Name: note.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月17日 星期三 22时53分39秒
 ******************************************************/

// 一、数据类型
// 六种数据类型： (5中基本类型和一个对象类型）
// 1. Object ( Fucntion, Array, Date...)
// 2. Number
// 3. String
// 4. Boolean
// 5. undefined
// 6. null

console.log(32 + 32); // 64
console.log("32" + 32); // "3232"
console.log("32" - 32); // 0
console.log("1.23" == 1.23);
console.log(0 == false);
console.log(null == undefined);
console.log(new Object() == new Object());
console.log([1, 2] == [1, 2]);
// 类型不同，返回false
// 类型相同：
//     NaN != NaN
//     new Object != new Object
//     null === null
//     undefined === undefined
// 类型相同，同===
// 类型不同，尝试类型转换和比较
//     null == undefined
//     number == string(转number)
//     boolean == ? (转number)
//     object == number | string（尝试转为基本类型）
//     其他：false

var a = "string";
console.log(a.length);
a.t = 3;
console.log(a.t); // undefined, 因为创建a时，String("string"), 后就销毁了，所以属性添加不上去

// 类型检测：
// 1. typeof 
// 2. instanceof
// 3. Object.prototype.toString
// 4. constructor
// 5. duck type

typeof 100; // "number"
typeof true; // "boolean"
// typeof function; // "function"
typeof (undefined); // "undefined"
typeof new Object(); // "object"
typeof [1, 2]; // "object"
typeof NaN; // "number"
typeof null; // "object" what a fuck, almost perfect, but ... failed in this case

[1, 2] instanceof Array; // true
"aaa" instanceof String; // false... fuck

Object.prototype.toString.apply(null); // [object Null] fuck ie6/7/8, still [object Object], fuck...
Object.prototype.toString.apply(function() {}); // [object Function]
Object.prototype.toString.apply(undefined); // [object Undefined]
Object.prototype.toString.apply([]); // [object Array]

// 类型检测小结：
// typeof 适合基本类型以及function检测，遇到null失效
// {}.toString适合内置对象和基元类型，遇到null和undefined失效（ie6/7/8返回[object Object])
// instanceof 适合自定义对象和原生对象，但在不同的window和iframe间检测时失效

console.log(1 == '1');
console.log(1 === '1');
console.log(1 + '2' === '1' + 2);
console.log(1 + '2' === '1' + new Number(2));
console.log(1 + true === false + 2);
console.log(1 + null == undefined + 1);
console.log('a' - 'b' == 'b' - 'a');

console.log(typeof(typeof('string')));
console.log([null] instanceof Object);
console.log("test".substring(0, 1));
console.log({}.toString.apply(new String("str")));
console.log({}.toString.apply('str'));

console.log(5 - "4");
console.log(5 + "4");
console.log(+!{}[true]);
console.log(+[1]);
console.log(+[1, 2]);
console.log(7 - "a");
console.log(7 / 0);

console.log(5 + null);
console.log(4 == "4.00");
console.log(4 === "4.00");
console.log(null == undefined);
console.log(0 == false);
console.log(0 == null);
console.log(null == false);



