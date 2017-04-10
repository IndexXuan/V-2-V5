/**
 * LazyMan
*  ---------------------------------------------
*  Author : IndexXuan(https://github.com/IndexXuan)
*  Mail   : indexxuan@gmail.com
*  Date   : Fri 20 Jan 2017 06:07:41 PM CST
*/

/* 
 *
 * 基础回顾：
 * 浏览器三大常驻线程
 * JavaScript线程
 * GUI线程
 * 事件线程
 * js线程与gui线程互斥，即互相阻塞
 * 事件线程负责在js线程执行完当前事件循环同步代码后将后续异步代码推入js线程去执行
 *
 * js执行引擎基于事件循环，也没有原生sleep方法，因此需要自己实现调用队列，并在适当的时机自己去调度，来实现LazyMan
 *
 **/

/*
 * 调用示例：
* lazyMan('zz').eat('lunch').sleep('3').eat('dinner')

// 输出示例：
//  Hi!This is zz!

//  Eat lunch~

//  有3s间隔等待

//  Wake for 3s...

//  Eat dinner~
*/

'use strict'

class _LazyMan {
    constructor (name) {
        var me = this

        this.queue = []

        let taskP = () => new Promise((resolve, reject) => {
            console.log(`Hello ${name}!`)
            resolve()
        })
        this.queue.push(taskP)

        // start flush the taskP queue
        this.flushQueue()
    }

    eat (sth) {
        let taskP = () => new Promise((resolve, reject) => {
            console.log(`Eat ${sth}~`)
            resolve()
        })
        this.queue.push(taskP)
        return this
    }

    sleep (timeout) {
        let taskP = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`wait for ${timeout} s...`)
                resolve()
            }, timeout * 1000)
        })
        this.queue.push(taskP)
        return this
    }

    async next () {
        let taskPromise = this.queue.shift()
        if (taskPromise) {
            await taskPromise()
            this.next()
        }
    }

    flushQueue () {
        this.next() // no need setTimeout 0, since promise itself is the nextTick(microtask)
    }
}

let LazyMan = (name) => {
    return new _LazyMan(name)
}

LazyMan('zz').eat('lunch').sleep('3').eat('dinner')
// LazyMan('zz').sleep('10').eat('lunch').sleep('3').eat('dinner')
