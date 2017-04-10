/**
 *  Event Bus Implemention
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Thu 23 Feb 2017 10:21:52 AM CST
 */

var slice = Array.prototype.slice

function Event (ctx) {
    // 挂载上下文
    this._ctx = ctx || this
    this._events = {}
}

// 缓存原型
var eventProto = Event.prototype

// 注册事件
eventProto.on = function (event, fn) {
    this._events[event] = this._events[event] || []
    this._events[event].push(fn)

    return this
}

// 注册并且仅执行一次
eventProto.once = function (event, fn) {
    var self = this

    function onceFn () {
        self.off(event, onceFn)
        fn.apply(this, arguments)
    }

    onceFn.fn = fn
    this.on(event, onceFn)

    return this
}

// 卸载方法
//   可卸载全部
//   卸载特定事件
//   特定事件的特定处理函数
eventProto.off = function (event, fn) {
    // 卸载全局注册的所有时间，慎用
    if (!arguments) {
        this._events = {}
        return this
    }

    var events = this._events[event]
    // 没有已注册的，就返回this
    if (!events) return this

    // 删除特定事件
    if (arguments.length === 1 && typeof event === 'string') {
        delete this._events[event]
        return this
    }

    var handler;
    for (var i = 0; i < events.length; i++) {
        handler = events[i]
        if (handler === fn || handler.fn === fn) { // 比较事件处理器（包含once的特殊处理）
            events.splice(i, 1)
            break
        }
    }

    return this
}

eventProto.emit = function (event) {
    var events = this._events[event],
        args

    if (events) {
        events = events.slice(0)
        args = slice.call(arguments, 1)
        events.forEach(event => {
            event.apply(this._ctx, args)
        })
    }

    return this
}

export default Event
