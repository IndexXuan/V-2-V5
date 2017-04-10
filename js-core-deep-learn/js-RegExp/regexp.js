/*******************************************************
    > File Name: regexp.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年06月01日 星期一 12时17分47秒
 ******************************************************/

var emailval = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
// 一个核心就是带"."就一定要带后面的词 => (\.[\w-]+)
// 另一个核心就合理分组重复 
console.log(emailval.test("pengruihaha@163.com")); // true
console.log(emailval.test("@invilid.com")); // false

/***********************************************
 * ^       串的开始
 * $
 * *
 * +
 * ?
 * \b      单词边界
 *
 * \r
 * \n
 * \t
 * \f      换页
 * \x#     匹配十六进制数
 * \cX     匹配控制字符
 *
 * [...]   在集合中的任一个字符
 * [^...]  不在集合中的任一个字符
 * .       除\n以外的任一个字符
 * \w   　 任一个单字，包括字母数字下划线
 * \W
 * \s      所有的空白字符，包括空格，制表符
 * \S
 * \d      所有的数字
 * \D
 * \b      退格字符
 *
 **********************************************/

var varible = /[a-zA-Z_][a-zA-Z0-9_]*/;

console.log(varible.test("hello"));
console.log(varible.test("world"));
console.log(varible.test("_main_"));
console.log(varible.test("0871"));

var varible = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/**********************************************
 * {n}    重复n次
 * {n, }  重复n次或更多次
 * {n, m} 重复n-m次
 *********************************************/

var pid = /^(\d{15}|\d{18})$/; // id card
var mphone = /\d{11}/; // cell number
var phone = /\d{3,4}-\d{7,8}/; // tele number

mphone.test("15705213381");
phone.test("0516-85818009");
phone.test("010-1234567");

/**********************************************
 * 分组与引用
 * *******************************************/

var pattern = /\w{4}(\d{4})(\w{2})/;
var result = pattern.exec("yiunn0871cg");
console.log("city code = " + result[1] + ", county code " + result[2]);
result = pattern.exec("jsnu0516xz");
console.log("city code = " + result[1] + ", county code " + result[2]);

// exec will return a array(if matched), the first element is the string itself and the second is 
// the first group and so it is in others. 

/**********************************************
 * RegExp
 *   test
 *   exec
 *   compile
 *********************************************/

// String中的正则表达式
// match
// replace
// split
// search

var str = "life is very much like a mirror";
var result = str.match(/is|a/g);
console.log(result); // ["is", "a"]

var str = "<span>Welcome, John</span>";
var result = str.replace(/span/g, "div");
console.log(str);
console.log(result);

var result1 = str.replace(/(w+), \s(\w+)/g, "$2, $1");
console.log(result);

var str1 = "John : tomorrow    :remove:file";
var result2 = str1.split(/\s*:\s*/);
console.log(str1);
console.log(result2);

var str3 = "Tomorrow is another day";
var index3 = str.search(/another/);
console.log(index3); // 12


