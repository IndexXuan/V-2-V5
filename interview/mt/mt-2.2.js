/**
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Thu 09 Mar 2017 04:37:59 PM CST
 */

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 50, 51, 52, 53, 54, 100]
// get index of 5, 52, 99, if not found, return null

var binaryFind = function (arr, target, left, right) {
  if (!(arr instanceof Array)) return

  if (left >= right) return null
  if (target < arr[0] || target > arr[arr.length - 1]) return null

  left = +left || 0
  right = +right || arr.length - 1
  var middle = Math.floor((left + right) / 2)
  if (middle === left || middle === right) {
    if (target === arr[left]) {
      return left
    }
    if (target === arr[right]) {
      return right 
    }
    return null
  }
  if (arr[middle] > target) {
    right = middle
  } else if (arr[middle] < target) {
    left = middle
  } else {
    return middle
  }

  return binaryFind(arr, target, left, right)
}

// test
console.log(binaryFind(arr, 0))
console.log(binaryFind(arr, 5))
console.log(binaryFind(arr, 52))
console.log(binaryFind(arr, 99))
console.log(binaryFind(arr, 100))
console.log(binaryFind(arr, 109))
