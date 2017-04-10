/*******************************************************
# File   : q-Promise-design.js
# Author : IndexXuan(https://github.com/IndexXuan)
# Mail   : indexxuan@gmail.com
# Date   : 2015年12月23日 星期三 11时01分06秒
 ******************************************************/

/**
 * Part1
 * 本文意在解释promise是如何工作的，并通过代码逐步构建promise库
 * 来揭示其特殊的工作方式，最后向读者展示了其主要设计思想，尽量使
 * 读者不错过任何一个重要细节的前提下，让读者不断变化了解，找到
 * 适合自己的最佳实践。
 */

// 假设你正在写一个`function`,该函数不能立即返回一个值，通常给出的
// api是提供一个回调函数，将值传入道回调函数中，而不是立即返回一个值。
var oneOneSecondLater = function(callback) {
  setTimeout(function() {
    callback();
  }, 1000);
};

// 对于一些小问题来说这是一个简单的解决方案，但是仍有很大的提升空间
// 更一般的做法是提供一个能同时返回值并且抛出错误的工具，很明显的可以
// 用回调的方式处理抛出错误，这里演示同时`提供回调`和`错误处理`
var maybeOneOneSecondLater = function(callback, errback) {
  setTimeout(function() {
    if (Math.random() < .5) {
      callback(1);
    } else {
      errback(new Error('cannot provide one.'));
    }
  }, 1000);
};

/**
 * Part2 
 * 考虑一个能代替直接返回值或者直接抛出错误的一般方法，函数直接返回一个对象，
 * 该对象等同于最后函数的返回值，有可能成功或者失败。这个对象就是`promise`
 * 从名字上看最终这些个`promise`对象都是要被resolve掉的，我们可以调用promise
 * 上的函数来观察他们是否完全执行还是拒绝执行。如果promise被拒绝了，且拒绝的
 * 行为没有被明显的观察到，那么在promise链上其他的promise也会由于同样的原因而
 * 拒绝执行。
 */

var maybeOneOneSecondLater = function() {
  var callback;
  setTimeout(function() {
    callback(1);
  }, 1000);

  return {
    then: function(_callback) {
      callback = _callback;
    }
  };
};

maybeOneOneSecondLater().then(callback);

// 该设计有两个不足：
// 1. then方法之后第一次调用决定之后要使用的回调，如果每个注册的回调都能被
// 通知到，那么这个方案将非常有用
// 2. promise构建好之后，超过1s注册的回调，那么回调将不会被调用。

// 通用方案是我们接受一系列的回调函数，允许他们在超时之前或者超时之后都能注册
// ，通过设置一个有两个状态的变量实现这个方案。
var maybeOneOneSecondLater = function() {
  var pending = [], value;
  setTimeout(function() {
    value = 1;
    for (var i = 0, ii = pending.length; i < ii; i++) {
      var callback = pending[i];
      callback(value);
    }
    pending = undefined;
  }, 1000);

  return {
    then: function(callback) {
      if (pending) {
        pending.push(callback);
      } else {
        callback(value);
      }
    }
  };
};

var defer = function() {
  var pending = [], value;
  return {
    resolve: function(_value) {
      value = _value;
      for (var i = 0, ii = pending.length; i < ii; i++) {
        var callback = pending[i];
        callback(value);
      }
      pending = undefined;
    },
    then: function(callback) {
      if (pending) {
        pending.push(callback);
      } else {
        callback(value);
      }
    }
  }
};

var oneOneSecondLater = function() {
  var result = defer();
  setTimeout(function() {
    result.resolve();
  }, 1000);
  return result;
};

oneOneSecondLater().then(callback);

/**
 * 到这里就具备promise的雏形了
 * 1. 可以任意时间添加任意多的回调
 * 2. 可以人为决定什么时候resolve，而不是内部setTimeout实现
 * 3. 当promise被resolve之后，还可以添加回调，只不过立即就执行了
 * 4. 添加回调只能通过defer.then添加，非链式
 * 5. defer.resolve方法中的参数value，应用到每一个callback上，实
 * 际上还是一种情况callback2
 * 6. 无法传播出错情况，显然作者也考虑到了同样的问题，哈哈，先从
 * 可以出错这入手。
 */

var defer = function() {
  var pending = [], value;
  return {
    resolve: function(_value) {
      if (pending) {
        value = _value;
        for (var i = 0, ii = pending.length; i < ii; i++) {
          var callback = pending[i];
          callback(value);
        }
        pending = undefined;
      } else {
        throw new Error('A promise can only be resolved once.')；
      }
    },
    then: function(callback) {
      if (pending) {
        pending.push(callback);
      } else {
        callback(value);
      }
    }
  }
};

// usage
var d = defer();
d.then(fn1);
d.then(fn2);
d.resolve(value);
// 还是达不了我们想要的效果

/**
 * Part3 
 * 该设计中两个独立的部分引入了一些变量。第一部分使得分离和组合deferred
 * 的resolve和promise变得非常容易。同时也使得我们很容易区分promise和其他值。
 *
 * 按照职责单一原则，通过编码分离promise和resolver。如果授权给某人一个promise，
 * 这里只允许他增加观察者。如果授权给某人resolver，他应当仅仅能决定什么时候给
 * 出解决方案。彼此职责不能混淆。大量实验表明任何不可避免的越权行为后续的改动
 * 变得很难维护。
 *
 * 两种办法区分promise
 * 1. 原型继承
 * 2. 鸭子辩型
 */

// to be continue... cannot understand it right now...

