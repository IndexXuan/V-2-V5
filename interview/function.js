/**
 *  function.js
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 06 Feb 2017 02:00:45 PM CST
 */

/* 一、基础实现 */

const add = num => incre => num + incre

const add1 = add(1)

const add2 = add(2)

const add7 = add(7)

console.log(add(1)(7), add7(7))

// add(1)(7) = 8
// => add1(7) = 8
//
// add(7)(7) = 14
// => add7(7) = 14


/* 二、抽象 */

// 偏函数，传入一个函数和固定参数，构造并返回一个函数以供调用
const curry = (fn, ...fixedArgs) => (...args) => fn.bind(null, ...fixedArgs.concat(args))

// 水龙头
const tap = curry((fn, x) => { fn(x); return x }) // 调用函数，并返回

// tap的应用
const trace = label => tap(x => console.log(`== ${label}: ${x}`))

// 函数逆序调用
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

// 函数顺序调用
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const map = curry((fn, arr) => arr.map(fn)) // 注意参数列表顺序，外部想怎么调用，这里的fn的参数就应该以怎样的顺序，下同

const join = curry((label, arr) => arr.join(label))

const split = curry((splitOn, str) => str.split(splitOn))

const toLowerCase = str => str.toLowerCase()

const toSlug1 = input => encodeURIComponent(
    join('-')(
        map(toLowerCase)(
            split(' ')(
                input
            )
        )
    )
)

const toSlug2 = compose(
    encodeURIComponent,
    join('-'),
    map(toLowerCase),
    split(' ')
)

const toSlug = pipe(
    // trace('input'),
    split(' '),
    map(toLowerCase),
    // trace('after map'),
    join('-'),
    encodeURIComponent
)

