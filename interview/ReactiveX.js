/**
 *  Reactive the data
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Thu 02 Mar 2017 10:38:09 AM CST
 */

class ReactiveX {
    constructor (data) {
        this.data = data
        this.def = Object.defineProperty
        this.isObj = obj => (typeof obj === 'object' && obj != null)
        this.walk(data)
    }

    walk (obj) {
        if (!this.isObj(obj)) {
            console.info(`you can only pass object in`)
            return
        }
        let keys = Object.keys(obj)
        keys.forEach(key => {
            let value = obj[key]
            if (this.isObj(value)) {
                new ReactiveX(value)
            }
            this.reactiveX(key, value)
        })
    }

    reactiveX (key, value) {
        let self = this
        this.def(this.data, key, {
            configurable: true,
            enumarable: true,
            get: function () {
                console.log(`you get me: ${key}, I am ${typeof value}`)
                return value
            },
            set: function (newVal) {
                if (self.isObj(newVal)) {
                    new ReactiveX(newVal)
                }
                value = newVal
                console.log(`you set me with new value: ${newVal}`)
            }
        })
    }
}

// test
let data = {
    user: {
        name: "hello world",
        age: "24"
    },
    address: {
        city: "beijing"
    }
}

var app = new ReactiveX(data)
console.log(app.data.user.name)
console.log(app.data.address.city = 'xuzhou')
console.log(app.data.address = null)

