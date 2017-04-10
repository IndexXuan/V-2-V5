/**
 *  排序算法汇总
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Sun 22 Jan 2017 04:23:06 PM CST
 */

/**
 * swap
 *
 * @param {Array} arr - target array
 * @param {Number} i - index1
 * @param {Number} j - index2
 * @returns {undefined}
 */
function swap(arr, i, j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}


/**
 * partition
 *
 * @param {Array} arr
 * @param {Number} left
 * @param {Number} right
 * @returns {Number}
 */
function partition (arr, left, right) { // 分区操作
    var pivot = left, // 设定基准值（pivot）
        index = pivot + 1
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index)
            index++
        }        
    }
    swap(arr, pivot, index - 1)
    return index - 1
}

// 1. 快速排序－高级版
function quickSort (arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left !== 'number' ? 0 : left,
        right = typeof right !== 'number' ? len - 1 : right

    if (left < right) {
        partitionIndex = partition(arr, left, right)
        quickSort(arr, left, partitionIndex - 1)
        quickSort(arr, partitionIndex + 1, right)
    }
    return arr
}

// 1.2 快排－简单版
function quickSort2 (arr) {
    if (arr.length === 0) return []

    var par = arr[0]
    var left = []
    var right = []
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] <= par) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort2(left).concat(par, quickSort2(right))
}

// 1.2 快排－简单版
function quickSort3 (arr) {
    if (arr.length === 0) return []

        var index = (Math.random() * arr.length - 1)
        var par = arr[index]
        var left = []
        var right = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] <= par) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return quickSort2(left).concat(par, quickSort2(right))
}

// 2. 冒泡排序
function bubbleSort (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
    }

    return arr
}

// 3. 选择排序，和冒泡相似，就是不多次交换了
function selectionSort (arr) {
    for (var i = 0; i < arr.length; i++) {
        var min = i
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j
            }
        }
        swap(arr, i, min)
    }

    return arr
}

// 4. 插入排序
function insertionSort (arr) {
    for (var i = 1; i < arr.length; i++) {
        var preIndex = i - 1 // 前串最后一个index
        var current = arr[i] // 当前项
        // 还没搜索到头并且当前项还小于前串当前搜索项，则继续搜索
        // 要相信前串已经是升序得了
        while (index >= 0 && current < arr[preIndex]) {
            arr[preIndex + 1] = arr[preIndex] // 整体后移
            preIndex-- // 前串收缩一个长度
        }
        arr[preIndex + 1] = current // current占据前串最后一个（因为后面都后移了，空出来此处）
    }

    return arr
}

function shellSort (arr) {
    var len = arr.length,
        temp,
        gap = 1

    // 动态计算调整gap
    while (gap < len / 3) {
        gap = gap * 3 + 1
    }

    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i]
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = temp
        }
    }

    return arr
}

function countingSort (arr, maxValue) {
    var bucket = new Array(maxValue + 1),
        sortedIndex = 0,
        arrLen = arr.length,
        bucketLen = maxValue + 1

    for (var i = 0; i < arrLen; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0
        }
        bucket[arr[i]]++
    }

    for (var j = 0; j < bucketLen; j++) {
        while (bucket[j] > 0) {
            arr[sortedIndex++] = j
            bucket[j]--
        }
    }

    return arr
}

// test
var range = 100000
var SUM   = 100000
var arr = []

for (var i = 0; i < SUM; i++) {
    arr[i] = range * Math.random() | 0
    // arr[i] = 99999 - i
}

console.log('before sort:\n')
// console.log(arr)

var testarr = arr.slice(0)
console.time('quickSort')
// console.log(quickSort(testarr))
quickSort(testarr)
console.timeEnd('quickSort')

var testarr = arr.slice(0)
console.time('quickSort2')
// console.log(quickSort2(testarr))
quickSort2(testarr)
console.timeEnd('quickSort2')

var testarr = arr.slice(0)
console.time('quickSort3')
// console.log(quickSort2(testarr))
quickSort3(testarr)
console.timeEnd('quickSort3')

var testarr = arr.slice(0)
console.time('shell sort')
// console.log(shellSort(testarr))
shellSort(testarr)
console.timeEnd('shell sort')

var testarr = arr.slice(0)
console.time('counting sort')
// console.log(countingSort(testarr))
countingSort(testarr, range)
console.timeEnd('counting sort')

var testarr = arr.slice(0)
console.time('bubbleSort sort')
// console.log(bubbleSort(testarr))
bubbleSort(testarr)
console.timeEnd('bubbleSort sort')

var testarr = arr.slice(0)
console.time('selection sort')
// console.log(selectionSort(testarr))
selectionSort(testarr)
console.timeEnd('selection sort')

var testarr = arr.slice(0)
console.time('insertion sort')
// console.log(insertionSort(testarr))
insertionSort(testarr)
console.timeEnd('insertion sort')

