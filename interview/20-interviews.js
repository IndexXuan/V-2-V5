/**
 *  TODO: file intro...
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Fri 17 Mar 2017 12:20:58 PM CST
 */

var isHw = function (str) {
  var len = str.length
  var middle = Math.floor(len / 2)
  var flag = true 
  for (var i = 0; i < middle; i++) {
    if (str[i] !== str[len - 1 - i]) {
      flag = false
    }
  }

  return flag
}

for (var i = 0; i < 10000; i++) {
  if (isHw(i + '')) {
    // console.log(i)
  }
}

var handle = function (a) {
  var b = 3
  var tmp = function (a) {
    b = a + b
    // console.log(a, b) // 5 8, 6 14
    return tmp
  }
  tmp.toString = function () {
    return b
  }

  return tmp
}

console.log(handle(4)(5)(6))

