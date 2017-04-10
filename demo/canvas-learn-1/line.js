/**
 *  canvas demo & learn
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 12 Sep 2016 03:28:42 PM CST
 */

var DEFAULT_CLOSER = 20
var DEFAULT_POLYGON_COLOR = '#f50'
var DEFAULT_RECT_COLOR = 'yellow'

var canvas = document.getElementById('demo')
var pen = canvas.getContext('2d')

const $ = selector => document.querySelector(selector)

// btns
var startBtn = $('#start')
var endBtn = $('#end')

// store
var store = {
    'polygon': [],
    'rect': []
}

// 编辑状态量
var state = 0

canvas.addEventListener('click', handleClick, false)
canvas.addEventListener('mousemove', handleMousemove, false)

var drawPolygon = function () {
    state = 1
}

var drawRect = function () {
    state = 2
}

function handleClick (e) {
    if (state === 0) return

    var x = e.layerX
    var y = e.layerY
    if (state === 1) {
        var len = store['polygon'].length
        store['polygon'].push({
            id: ++len,
            x: x,
            y: y
        })
        renderPolygon(checkCloser(x, y, 'polygon'))
    } else if (state === 2) {
        var len = store['rect'].length
        store['rect'].push({
            id: ++len,
            x: x,
            y: y
        })
        if (checkCloser(x, y, 'rect')) {
            pen.closePath()
        }
        renderRect()
    }
}

function handleMousemove (e) {
    if (state === 0) return

    var x = e.layerX
    var y = e.layerY
    if (state === 1) {
        if (store['polygon'].length < 1) return
        var s = store['polygon'].slice(0)
        var last =  s[s.length - 1]
        pen.clearRect(0, 0, 2000, 1000)
        renderPolygon()
        pen.moveTo(last.x, last.y)
        pen.lineTo(x, y)
        pen.stroke()
    } else if (state === 2) {
        var len = store['rect'].length
        if (checkCloser(x, y, 'rect')) {
            pen.closePath()
        }
        renderRect()
    }
}

function checkCloser (x, y, target) {
    var s = store[target].slice(0)
    var starter = s.shift()
    if (closer(starter.x, x, DEFAULT_CLOSER) && closer(starter.y, y, DEFAULT_CLOSER)) {
        return true
    }
    return false
}

function closer (a, b, scale) {
    var res = a - b
    res = res < 0 ? -res : res
    if (res < scale) {
        return true
    }

    return false
}

function renderPolygon (close, mode) {
    pen.clearRect(0, 0, 2000, 1000)
    if (store['polygon'].length < 2) return
    color = DEFAULT_POLYGON_COLOR 
    if (close) {
        store['polygon'].pop()
        state = 0
        pen.closePath()
    }
    var s = store['polygon'].slice(0)
    if (mode === 'fill') {
        pen.fillStyle = color
    } else {
        pen.strokeStyle = color
    }
    pen.beginPath()
    var starter = s.shift()
    pen.moveTo(starter.x, starter.y)
    while (s.length) {
        var p = s.shift()
        pen.lineTo(p.x, p.y)
    }
    if (close === true) {
        pen.closePath()
    }
    if (mode === 'fill') {
        pen.fill()
    } else {
        pen.stroke()
    }
}

function renderRect (color, mode) {
    if (store['rect'].length < 2) {
        return
    }
    var color = DEFAULT_RECT_COLOR
    if (mode === 'fill') {
        pen.fillStyle = color
    } else {
        pen.strokeStyle = color
    }
    var s = store['rect'].slice(0, 2)
    var width = Math.abs(s[1].x - s[0].x)
    var height = Math.abs(s[1].y - s[0].y)
    if (mode === 'fill') {
        pen.fillRect(s[0].x, s[0].y, width, height)
    } else {
        pen.strokeRect(s[0].x, s[0].y, width, height)
    }
}

function resetStore () {
    store['polygon'].length = 0
    store['rect'].length = 0
}

function clearCanvas () {
    pen.clearRect(0, 0, 2000, 1000)
    resetStore()
}

function cancelDrawable () {
    this.state = 0
}

function printStore () {
    console.table(store)
}

function saveStore () {
    localStorage.setItem(`store-${Date.now()}`, JSON.stringify(store))
}

window.store = store
window.state = state















