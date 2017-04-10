/**
 *  format the world
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 13 Feb 2017 11:09:33 AM CST
 */

function formatNumber (num, size) {
    var size = size || 2
    // Number.prototype.toFixed => String
    return +num.toFixed(size).replace(/\.00/g, '')
}

console.log(formatNumber(12.233), formatNumber(12))

function paddingZero (num) {
    return String(num).replace(/\b(\d{1})\b/g, '0$1')
}

console.log(paddingZero(1))

function formatDate(source, format) {
    // 默认值提权补全
    var date = new Date()
    format = format || 'yyyy-MM-dd HH:mm'

    // 参数个数判断，可以只传入format或什么都不传（那也相当于传入format）
    if (typeof source === 'string') format = source
    if (typeof source === 'number') date = new Date(source)

    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDay()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return format
        .replace("yyyy", year)
        .replace("MM", month)
        .replace("dd", day)
        .replace("HH", hour)
        .replace("mm", minute)
        .replace("ss", second)
        .replace(/\b(\d{1})\b/g, '0$1')

    return date
}

console.log(formatDate('2016-1-1'))
console.log(formatDate())
