/**
 *  canvas demo & learn
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 12 Sep 2016 03:28:42 PM CST
 */

var canvas = document.getElementById('demo')
var pen = canvas.getContext('2d')

pen.fillStyle = 'red'
pen.fillRect(10, 10, 100, 100)

pen.fillStyle = 'green'
pen.fillRect(20, 20, 100, 100)

// path
pen.fillStyle = '#000'
pen.beginPath()
pen.moveTo(150, 150)
pen.lineTo(200, 250)
pen.lineTo(200, 50)
pen.fill()

pen.fillStyle = '#f50'
pen.beginPath()
pen.arc(75, 75, 50, 0, Math.PI * 2, true) // Outer circle
pen.moveTo(110, 75)
pen.arc(75, 75, 35, 0, Math.PI, false) // Mouth (clockwise)
pen.moveTo(65, 65)
pen.arc(60, 65, 5, 0, Math.PI * 2, true) // Left eye
pen.moveTo(95, 65)
pen.arc(90, 65, 5, 0, Math.PI * 2, true) // Right eye
pen.stroke()

var baseX = 300
var baseY = 300
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        pen.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)}, 0)`
        pen.fillRect(baseX + j * 25, baseY + i * 25, 25, 25)
    }
}

var baseX = 500
var baseY = 200
for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        pen.strokeStyle = `rgb(0, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)})`
        pen.beginPath()
        pen.arc(baseX + j * 25, baseY + i * 25, 10, 0, Math.PI * 2, true)
        pen.stroke()
    }
}
