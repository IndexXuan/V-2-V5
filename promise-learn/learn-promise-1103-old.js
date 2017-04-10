/**
 *  Promise Learn
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Thu 03 Nov 2016 03:53:00 PM CST
 */

function Promise (executor) {
    var self = this
    self.status = 'pending'
    self.data = undefined
    self.onResolvedCallback = [] // Promise resolve时回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
    self.onRejectedCallback = [] // 同上

    function resolve (value) {
        if (self.status === 'pending') {
            self.status = 'resolved'
            self.data = value
            for (var i = 0; i < self.onResolvedCallback.length; i++) {
                self.onRejectedCallback[i](value)
            }
        }
    }

    function reject (reason) {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
            self.onRejectedCallback[i](reason)
        }
    }

    try {
        executor(resolve, reject) // 执行executor
    } catch (e) {
        reject(e)
    }
}

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this
    var promise2

    // 根据标准，如果then的参数不是function, 则我们忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function (value)  { return value }
    onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }

    if (self.status === 'resolved') {
        return promise2 = new Promise(function (resolve, reject) {
            try {
                var x = onResolved(self.data)
                if (x instanceof Promise) { // 如果OnResolved的返回值是一个Promise对象，直到取得它的结果作为promise2的值
                    x.then(resolve, reject)
                }
                resolve(x) // 否则，以它的返回值作为promise2的结果
            } catch (e) {
                reject(e) // 如果出错，以捕获到的错误为了promise2的结果
            }
        })
    }

    // 此处与前一个if的逻辑几乎相同，区别在于调用的是onRejected函数，就不再做过多解释
    if (self.status === 'rejected') {
        return promise2 = new Promise(function (resolve, reject) {
            try {
                var x = onRejected(self.data)
                if (x instanceof Promise) {
                    x.then(resolve, reject)
                }
            } catch (e) {
                reject(e)
            }
        })
    }

    if (self.status === 'pending') {
        // 如果当前的Promise还处在pending状态，我们并不能确定调用onResolved还是onRejected
        // 只能等到promise状态确定后，才能知道如何处理
        // 所以我们需要把我们的**两种情况**的处理逻辑作为callback放入promise1的回调数组里
        // 逻辑本身跟第一个if块内几乎一致，此处不做过多解释
        return promise2 = new Promise(function (resolve, reject) {
            self.onResolvedCallback.push(function (value) {
                try {
                    var x = onResolved(self.data)
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push(function (reason) {
                try {
                    var x = onRejected(self.data)
                    if (x instanceof Promise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}


