/**
 *  rxjs learn
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Fri 10 Feb 2017 02:12:12 PM CST
 */

var fs = require('fs') 
var Rx = require('../node_modules/rxjs/Rx.js')

function test () {

    function foo () {
        console.log('Hello')
        return 42
    }
    var x = foo.call()
    console.log(x)
    // Hello
    // 42

    // Observable
    var foo = Rx.Observable.create(function (observer) {
        console.log('Hello')
        observer.next(42)
    })
    foo.subscribe(function (x) {
        console.log(x)
    })
    // Hello
    // 42

    /**
    * Observable与Function不同在于，Observable可以依次返回多个值
    * Observable既可异步也可以同步
    */

    var foo = Rx.Observable.create(function (observer) {
        console.log('Hello')
        observer.next(42)
        observer.next(100) // return another value
        observer.next(200) // return another value
        setTimeout(function () {
            observer.next(300)
        }, 1000)
    })
    console.log('before')
    foo.subscribe(function (x) {
        console.log(x)
    })
    console.log('after')
    // before
    // Hello
    // 100
    // 200
    // after
    // 300
    
    var array = ['1', '2', 'foo', '5', 'bar']
    var result = array.map(x => parseInt(x)).filter(x => !isNaN(x))
    console.log(result) // [1, 2, 5]

    var source = Rx.Observable.interval(400).take(9).map(i => array[i])
    var result = source.map(x => parseInt(x)).filter(x => !isNaN(x))
    result.subscribe(x => console.log(x))

    function f () {
        return Rx.Observable.from(arguments)
    }

    f(1, 2, 3).subscribe(
        function (x) { console.log('Next: ' + x); },
        function (err) { console.log('Error: ', err) },
        function () { console.log('Completed') }
    )

    var promise = new Promise((resolve, reject) => {
        resolve(42)
    })
    var source = Rx.Observable.fromPromise(promise)
    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x) },
        function (err) { console.log('Error: ' + err) },
        function () { console.log('Completed') }
    )

    var source = Rx.Observable.of(1, 2, 3)
    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x) },
        function (err) { console.log('Error: ' + err) },
        function () { console.log('Completed') }
    )

    var obj = {
        foo: 42,
        bar: 58,
        baz: 78
    }

    var source = Rx.Observable.pairs(obj)
    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x) },
        function (err) { console.log('Error: ' + err) },
        function () { console.log('Completed') }
    )

    var source = Rx.Observable.defer(function () {
        return Rx.Observable.of(42)
    })

    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x) },
        function (err) { console.log('Error: ' + err) },
        function () { console.log('Completed') }
    )

    var source = Rx.Observable.range(0, 3)

    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x) },
        function (err) { console.log('Error: ' + err) },
        function () { console.log('Completed') }
    )

    var source = Rx.Observable
        .interval(500 /* 500ms */)
        .timeInterval()
        .take(3)

    var subscription = source.subscribe(
        function (x) { console.log('Next: ' + x) },
        function (err) { console.log('Error: ' + err) },
        function () { console.log('Completed') }
    )
    // Next: {value: 0, interval: 500}
    // Next: {value: 1, interval: 500}
    // Next: {value: 2, interval: 500}
    // Completed

    const start = 5
    Rx.Observable
        .timer(100, 100)
        .map(i => start - i)
        .take(start + 1)
        .subscribe(i => console.log(i))

}

// var source = Rx.Observable.start(
//     function () {
//         return '123'
//     }
// )
// var subscription = source.subscribe(
//     function (x) {
//         console.log('Next: ' + x)
//     }
// )

// Rx.Observable.while(
//     function () { return i++ < 3 },
//     Rx.Observable.of(42)
// )

// var i = 0
// var source = Rx.Observable.of(42).doWhile(
//     function () { return ++i < 2; }
// )
// var subscription = subscribe(
//     function (x) { console.log('Next: ' + x) },
//     function (err) { console.log('Error: ' + err) },
//     function () { console.log('Completed') }
// )

// Rx.Observable.repeat(42, 3)
//     .subscribe(
//         function (x) { console.log('Next: ' + x) },
//         function (err) { console.log('Error: ' + err) },
//         function () { console.log('Completed') }
//     )

// var arr = [1, 2, 3]
// var source = Rx.Observable.ofArrayChanges(arr)
// var subscription = source.subscribe(
//     function (x) { console.log('Next: ' + x) },
//     function (err) { console.log('Error: ' + err) },
//     function () { console.log('Completed') }
// )

// var source = Rx.Observable.just(42)
// var subscription = source.subscribe(
//     function (x) { console.log('Next %s', x); },
//     function (err) { console.log('Error: %s', err) },
//     function () { console.log('Completed') }
// )

// var exists = Rx.Observable.fromCallback(fs.exists)

// // Check if file.txt exists
// var source = exists('file.txt')

// var subscription = source.subscribe(
//     function (x) { console.log('Next: ' + x) },
//     function (err) { console.log('Error: ' + err) },
//     function () { console.log('Completed') }
// )

// var input = $('#input')
// var source = Rx.Observable.fromEvent(input, 'click')
// var subscription = source.subscribe(
//     function (x) { console.log('Next: ' + x) },
//     function (err) { console.log('Error: ' + err) },
//     function () { console.log('Completed') }
// )











