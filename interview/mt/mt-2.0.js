/**
 *  singleton
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Thu 09 Mar 2017 04:31:11 PM CST
 */

var getInstance = (function () {
  var instance
  return function (factory) {
    if (!instance) {
      instance = new factory()
    }
    return instance
  }
}())

// test
function fn (a, b) {
  this.a = a
  this.b = b
}

var a = getInstance(fn)
var b = getInstance(fn)

console.log(a === b)

