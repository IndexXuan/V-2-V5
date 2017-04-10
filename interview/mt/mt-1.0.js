/**
 *  有点方
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Thu 09 Mar 2017 03:21:34 PM CST
 */

var str = 'ab-ce-ef'
// =? abCdEf
var str2 = str.replace(/\-(\w)/g, (all, match) => {
  return match.toUpperCase()
})
console.log(str2)


var data = [ [1, 4, 7], [2, 5, 8], [3, 6, 9] ]
// => [ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]

var ret = []
data.forEach((arr, index) => {
  ret.push([])
})
data.forEach((arr, index) => {
  arr.forEach((num, idx) => {
    ret[idx][index] = num
  })
})

console.log(ret)

var arrs = ['1', '2', '2', 2, 1, 2, '2', '1', '2', '1', '1', '2']
// => get max value & count

var hash = {}
var len = arrs.length
for (var i = 0; i < len; i++) {
  var key = arrs[i] + '-' + typeof arrs[i]
  if (hash[key] === void 0) {
    hash[key] = 0
  } else {
    hash[key]++
  }
}

console.log(hash)
var keys = Object.keys(hash)
var max = 0
for (var k = 0, ks = keys.length; k < ks; k++) {
  if (hash[keys[k]] > hash[keys[max]]) {
    max = k
  }
}
var maxItem = keys[max]
console.log(`max value: ${ maxItem.split('-')[0] }, count is: ${ hash[maxItem] }`)

