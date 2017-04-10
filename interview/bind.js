/**
 *  头条面试
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Tue 21 Feb 2017 11:18:16 AM CST
 */

if (!Function.prototype.bind2) {
    Function.prototype.bind2 = function (context) {
        var fToBind = this

        if (typeof fToBind !== 'function') {
            throw new TypeError('Function.prototype.bind - what to be bound must be callable!')
        }

        var slice = Array.prototype.slice
        var xargs = slice.call(arguments, 1)
        var noop = function () {}
        var fBound = function () {
            return fToBind.apply(
                // this => 返回的function的引用
                // 检查返回的function是否在被new初始化
                this instanceof noop ? this : context, 
                slice.call(arguments).concat(xargs)
            )
        }

        // fBound继承原绑定函数
        noop.prototype = this.prototype
        fBound.prototype = new noop

        return fBound
    }
}

// test
var obj1 = { name: 'obj1' }
var obj2 = { name: 'obj2' }

var fn = function () { console.log(this.name) }

var f1 = fn.bind2(obj1)
var f2 = fn.bind2(obj2)
var f1f2 = f1.bind2(obj2)

console.log('=========')

f1()
f2()
f1f2()



