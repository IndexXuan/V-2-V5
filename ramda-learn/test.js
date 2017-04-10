/**
 *  Ramda.js
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Wed 15 Mar 2017 06:08:52 PM CST
 */

const R = require('./ramda.js')

var square = x => x * x

// first example
R.map(square, [4, 8]) // [16, 64]


// curry
R.map(square, [4, 8])
R.map(square)([4, 8])
var mapSquare = R.map(square)
mapSquare([4, 8]) // [ 16, 64 ]

// 一. 比较运算
R.gt(2)(1) // true
R.gt('a')('z') // false

R.gte(2)(2) // true
R.gte('a')('z') // false

R.lt(2)(1) // false
R.lt('a')('z') // true

R.lte(2)(1) // false
R.lte('a')('z') // true

R.equals(1)(1) // true
R.equals(1)('1') // false
R.equals([1, 2, 3])([1, 2, 3]) // true

var a = {}
a.v = a
var b = {}
b.v = b

R.equals(a)(b) // true

R.eqBy(Math.abs, 5)(-5) // true

// 二. 数学运算
R.add(7)(10) // 17
R.subtract(10)(8) // 2
R.multiply(2)(5) // 10
R.divide(71)(100) // 0.71

// 三. 逻辑运算
var gt10 = x => x > 10
var even = x => x % 2 === 0

var f = R.either(gt10, even)
f(11) // true
f(8) // true

var f = R.both(gt10, even) // 几个函数
f(11) // false
f(12) // true

var isEvenAndGt10 = R.allPass([gt10, even]) // 函数数组，注意和 `both` 的区别
isEvenAndGt10(11) // false
isEvenAndGt10(12) // true

// 四. 字符串
R.split('.')('a.b.c.d.xyz.e') // ['a', 'b', 'c', 'xyz', e']

R.test(/^x/)('xyz') // true
R.test(/^y/)('xyz') // false

R.match(/[a-z]a/g)('bananas') // ['ba', 'na', 'na']
R.match(/a/)('b') // []
// R.match(/a/)(null) // TypeError: null does not have a method named "match"

// 五. 函数
  // 函数合成
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) // 7 => Math.abs(-4 * 2 + 1) 从右向左结合执行
var negative = x => -1 * x
var increaseOne = x => x + 1
var f = R.pipe(Math.pow, negative, increaseOne)
f(3, 4) // -80 =>  -(3^4) + 1

/**
 * R.converge(fn, [...fns]) 将第二个函数数组处理的结果数组传入第一个函数作为参数
 */
var sumOfArr = arr => {
  var sum = 0
  arr.forEach(i => sum += i)
  return sum
}
var lengthOfArr = arr => arr.length
var average = R.converge(R.divide, [sumOfArr, lengthOfArr])
average([1, 2, 3, 4, 5, 6, 7]) // 4

 // 柯里化
var addFourNumbers = (a, b, c, d) => a + b + c + d

var curriedAddFourNumbers = R.curry(addFourNumbers)
var f = curriedAddFourNumbers(1, 2)
var g = f(3)
g(4) // 10

// partial： 允许多参数的函数接受一个数组，指定最左边的部分参数进行填充
var multiply2 = (a, b) => a * b
var doubles = R.partial(multiply2, [2])
doubles(2) // 4

var greet = (salutation, title, firstName, lastName) => {
  return `${salutation}, ${title}. ${firstName} ${lastName}!`
}
var sayHello = R.partial(greet, ['Hello'])
var sayHelloToMs = R.partial(sayHello, ['Ms.'])
sayHelloToMs('Jane', 'Jones') // => Hello, Ms. Jane Jones!

var greetMsJaneJones = R.partialRight(greet, ['Ms', 'Jane', 'Jones'])
greetMsJaneJones('Hello') // Hello, Ms. Jane Jones!

// useWith: 接受一个函数fn和一个函数数组fnList作为参数，返回fn的柯里化版本，该新函数的参数先分别
// 经过对应的fnList成员处理，再传入fn执行
// 注意和converge区别，这个是传入参数，分别跟...fns执行，然后生成参数数组给第一个参数函数执行
var decreaseOne = x => x - 1
var increaseOne = x => x + 1
R.useWith(Math.pow, [decreaseOne, increaseOne])(3, 4) // 32

// memoize: 返回一个函数，会缓存每一次运行结果
var productOfArr = arr => {
  var product = 1
  arr.forEach(i => product *= i)
  return product
}

var count = 0
var factorial = R.memoize(n => {
  count += 1
  return productOfArr(R.range(1, n + 1))
})

factorial(5) // 120
factorial(5) // 120
factorial(5) // 120
count // 1 只调用了一次

// complement 返回一个新的函数，如果原函数返回true,该返回false,如果原函数返回false,则返回true
var gt10 = x => x > 10
var lte10 = R.complement(gt10)
gt10(7) // false
lte10(7) // true

  // 函数的执行
// binary 参数执行时，只传入前两个最前面的参数
var takesThreeArgs = function (a, b, c) {
  return [a, b, c]
}

var takesTwoArgs = R.binary(takesThreeArgs)
takesTwoArgs(1, 2, 3) // [1, 2, undefined]

// tap: 将一个值传入指定函数，并返回该值
// /一般用于 `打印trace` 然后继续给下一个函数执行，因为该值原原本本返回了
var sayX = x => console.log('x is ' + x)
R.tap(sayX)(100) // 返回100，输出 x is 100

// zipWith: 将两个数组对应位置的值，一起作为参数传入某函数
var f = (x, y) => { return x + y }
R.zipWith(f, [1, 2, 3])(['a', 'b', 'c'])
// [f(1, 'a'), f(2, 'b'), f(3, 'c')] => 依次再执行

// apply: 将数组转成参数序列，传入指定函数
var nums = [1, 2, 3, -99, 42, 6, 7]
R.apply(Math.max)(nums) // 42

// applySpec: 返回一个模板函数，该函数会将参数传入模板内的函数执行，然后将执行结果填充到模板
var getMetrics = R.applySpec({
  sum: R.add,
  nested: { mul: R.multiply }
})
getMetrics(2, 4) // { sum: 6, nested: { mul: 8} }

// ascend: 返回一个升序排列的比较函数，主要用于排序
var byAge = R.ascend(R.prop('age'))
var people = [
  { age: 23 },
  { age: 20 },
  { age: 30 },
  { age: 29 }
]
var peopleByYoungestFirst = R.sort(byAge)(people) // [ { age: 20}, { age: 23 }, { age: 29 }, { age: 30 } ]

// descend: 返回一个降序排列的比较函数，主要用于排序

// 六. 数组
R.contains(3)([1, 2, 3]) // true
R.contains(4)([1, 2, 3]) // false
R.contains({ name: 'Fred' })([ { name: 'Fred' } ]) // true
R.contains([42])([42]) // true

var equals3 = R.equals(3)
R.all(equals3)([3, 3, 3, 3]) // true
R.all(equals3)([3, 3, 1, 3]) // false

// any: 只要有一个成员不满足，就返回true
var lessThan0 = R.flip(R.lt)(0)
var lessThan2 = R.flip(R.lt)(2)
R.any(lessThan0)([1, 2]) // false
R.any(lessThan2)([1, 2]) // true

// none
var isEven = n => n % 2 === 0
R.none(isEven)([1, 3, 5, 7, 9, 11]) // true
R.none(isEven)([1, 3, 5, 7, 8, 11]) // false

  // 6.2 数组的截取和添加
  // 6.3 数组的过滤
  // 6.4 单数组运算
  // 6.5 双数组运算
  // 6.6 复合数组

// 七. 对象
var hasName = R.has('name')
hasName({ name: 'alice' }) // true
hasName({ name: 'bob' }) // true
hasName({}) // false

var point = { x: 0, y: 0 }
var pointHas = R.has(R.__, point)
pointHas('x') // true
pointHas('y') // true
pointHas('z') // false

// hasIn 返回一个bool值，表示对象自身或原型链上是否具有某个属性
function Rectangle (width, height) {
  this.width = width
  this.height = height
}
Rectangle.prototype.area = function () {
  return this.width * this.height
}

var square = new Rectangle(2, 2)
R.hasIn('width')(square) // true
R.hasIn('area')(square) // true

// propEq:　如果属性等于给定值，返回true
var abby = { name: 'Abby', age: 8, hair: 'blond' }
var fred = { name: 'fred', age: 8, hair: 'brown' }
var rusty = { name: 'Rusty', age: 8, hair: 'brown' }
var alois = { name: 'Alois', age: 8, hair: 'surly' }
var kids = [ abby, fred, rusty, alois ]
var hasBrownHair = R.propEq('hair', 'brown')
R.filter(hasBrownHair)(kids) // [fred, rusty]

// whereEq: 如果属性值等于给定值，返回true
var pred = R.whereEq({a: 1, b: 2})
pred({a: 1}) // false
pred({a: 1, b: 2}) // true
pred({a: 1, b: 2, c: 3}) // true
pred({a: 1, b: 1}) // false

// where 如果各个属性都符合指定条件，返回true
var pred = R.where({
  a: R.equals('foo'),
  b: R.complement(R.equals('bar')),
  x: R.gt(R.__, 10),
  y: R.lt(R.__, 20)
})

pred({ a: 'foo', b: 'xxx', x: 11, y: 19 }) // true
pred({ a: 'xxx', b: 'xxx', x: 11, y: 19 }) // false
pred({ a: 'foo', b: 'bar', x: 11, y: 19 }) // false
pred({ a: 'foo', b: 'xxx', x: 10, y: 19 }) // false
pred({ a: 'foo', b: 'xxx', x: 11, y: 20 }) // false


// 7.2 对象的过滤
// omit: 过滤指定属性(名)
R.omit(['a', 'd'])({a: 1, b: 2, c: 3, d: 4})
// {b: 2, c: 3}

// filter & reject过滤的是属性值
R.filter(isEven)({a: 1, b: 2, c: 3, d: 4}) // {b: 2, d: 4}
R.reject(isEven)({a: 1, b: 2, c: 3, d: 4}) // {a: 1, c: 3}

// 7.3 对象的截取

// 过滤指定属性
R.dissoc('b')({a: 1, b: 2, c: 3}) // {a: 1, c: 3}

// 添加或改写某个属性
R.assoc('c', 3)({a: 1, b: 2}) // {a: 1, b: 2, c: 3}

// 根据属性值是否满足给定条件，将属性分区
R.partition(R.contains('s'))({a: 'sss', b: 'ttt', foo: 'bars'}) // [ {a: 'sss', foo: 'bars'}, {b: 'ttt'} ]

// pick: 返回指定属性组成的新对象
R.pick(['a', 'd'])({a: 1, b: 2, c: 3, d: 4}) // {a: 1, d: 4}

// pickAll: 与pick类似，但会包括不存在的集合
R.pickAll(['a', 'd'])({a: 1, b: 2, c: 3, d: 4}) // {a: 1, d: 4}
R.pickAll(['a', 'e', 'f'])({a: 1, b: 2, c: 3, d: 4}) // {a:1, e: undefined, f: undefined}

// pickBy: 返回符合条件的属性
var isUpperCase = (val, key) => key.toUpperCase() === key
R.pickBy(isUpperCase)({a: 1, b: 2, A: 3, B: 4}) // {A: 3, B:4}

// keys: 返回对象自身属性名组成的新数组
R.keys({a: 1, b: 2, c: 3}) // ['a', 'b', 'c']

// keysIn: 返回对象自身和继承的属性的属性名组成的新数组
var F = function () { this.x = 'X' }
F.prototype.y = 'Y'
var f = new F()
R.keysIn(f) // ['x', 'y']

// values: 返回对象自身属性的属性值组成的数组
R.values({a: 1, b: 2, c: 3}) // => [1, 2, 3]

// valuesIn: 返回对象自身的和继承的属性的属性值组成的数组
R.valuesIn(f) // ['x', 'y']

// invertObj: 将属性值和属性名互换。如果多个属性的属性值相同，只返回最后一个属性
var raceResultsByFirstName = {
  first: 'alice',
  second: 'jake',
  third: 'alice'
}
R.invert(raceResultsByFirstName) // { 'alice': ['first', 'third'], 'jake': ['second'] }

// 7.4 对象的运算
// prop: 返回对象的指定属性
R.prop('x')({ x: 100 })

R.prop('x')({}) // undefined

// map: 对象的所有属性依次执行某个函数
var double = x => x * 2
R.map(double)({x: 1, y: 2, z: 3}) // {x: 2, y: 4, z: 6}

// mapObjIndexed: 与map类似，但是会额外传入属性名和整个对象
var values = { x: 1, y: 1, z: 3 }
var prependKeyAndDouble = (num, key, obj) => key + (num * 2)
R.mapObjIndexed(prependKeyAndDouble)(values) // {x: 'x2', y: 'y4', z: 'z6' }

// forEachObjIndexed: 每个属性依次执行给定的函数，给定的函数的参数分别是属性值和属性名，返回原对象
var printKeyConcatValue = (value, key) => console.log(key + ': ' + value)
R.forEachObjIndexed(printKeyConcatValue)({x: 1, y: 2}) // { x: 1, y: 2 }

// 后面覆盖前面的值
R.merge({ 'name': 'fred', 'age': 10})({ 'age': 40 }) // { 'name': 'fred', 'age': 40 }

var resetToDefault = R.merge(R.__, { x: 0 })
resetToDefault({x: 5, y: 2}) // { x: 0, y: 2 }

// mergeWith: 合并两个对象，如果有同名属性，会使用指定的函数处理
R.mergeWith(
  R.concat,
  { a: true, values: [10, 20] },
  { b: true, values: [15, 35] }
) // { a: true, b: true, values: [10, 20, 15, 35] }

// eqProps: 比较两个对象的指定属性是否相等
var o1 = { a: 1, b: 2, c: 3, d: 4 }
var o2 = { a: 10, b: 20, c: 3, d: 40}
R.eqProps('a', o1)(o2) // false
R.eqProps('c', o1)(o2) // true

// R.esolve: 对象的属性分别经过一组函数的处理，返回一个新的对象
var tomato = {
  firstName:  ' Tomoto',
  data: { elapsed: 100, remaining: 1400 },
  id: 123
}

var transformations = {
  first: R.trim,
  lastName: R.trim, // 不会被调用
  data: { elapsed: R.add(1), remaining: R.add(-1) }
}
R.evolve(transformations)(tomato)
// {
//   firstName: 'Tomato',
//   data: { elapsed: 101, remaining: 1399 },
//   id: 123
// }

// 7.5 复合对象
// path: 去除数组的指定路径的值
R.path(['a', 'b'], {a: { b: 2 }}) // 2
R.path(['a', 'b'], {c: { b: 2 }}) // undefined

// pathEq: 返回指定路径的值符合条件的成员
var user1 = { address: { zipCode: 90210 } }
var user2 = { address: { zipCode: 55555 } }
var user3 = { name: 'Bob' }
var users = { user1, user2, user3 }
var isFamous = R.pathEq(['address', 'zipCode'], 90210)
R.filter(isFamous)(users) // [ user1 ]

// assocPath: 添加或改写指定路径的属性的值
R.assocPath(['a', 'b', 'c'], 42)({ a: { b: {c: 0} } }) // {a: b: {c: 42}}}
R.assocPath(['a', 'b', 'c'], 42)({ a: 5 }) //设置成: {a: b: {c: 42}}}












