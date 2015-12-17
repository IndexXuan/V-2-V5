/**
 * author : IndexXuan
 * date   : 20151212
 * home   : https://github.com/IndexXuan/V-2-V5/blob/master/promise-relearn-with-es2015.js
 */

let promise = new Promise( (resolve, reject) => {
  setTimeout( () => {
    reject("Error!");
  }, 1000);
});

promise.then((resolve) => {
  console.log(resolve);
}).catch( (reject) => {
  console.log(reject);
});

// 2. simple ajax get 
function getUrl(url) {
  return new Promise( (resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}

const url = 'http://httpbin.org/get';
// const url = 'http://httpbin.org/status/500';
getUrl(url).then( (res) => {
  console.log('result: ' + res);
}).catch( (err) => {
  console.log('Oh error comes: ' + err);
});

// 3. Promise.resolve静态方法就是将传递给它的参数填充到promise对象后并
// 返回这个对象，它有两个作用 
// （1）new Promise的快捷方式
// （2）将thenable对象转化为Promise对象
// thenable对象就好像是array-like这类对象一样，是具备then方法的对象，例如jqXHR
Promise.resolve(42).then( (resolve) => {
  console.log(resolve);
});
// 等价于
new Promise( (resolve) => {
    resolve(42);
});
let promise = Promise.resolve($.ajax('/json/comment.json')); // => promise对象
promise.then( (res) => {
  console.log('result is: ' + res);
});

// 4. Promise.reject同上，说不定你在debug时用得上
Promise.reject(new Error("Error comes!"));
// 等价于
new Promise( (resolve, reject) => {
    reject(new Error("Error comes!"));
});

// 5. 执行顺序
// 明明看起来应该同步调用的then方法却被异步调用，这是为了统一而且合乎规范
// 避免意料之外的不符合预期的问题出现，即使不在promise，人们有时也会手动
// setTimeout(fn, 0)
let promise = new Promise( (resolve) => {
  console.log('inner promise');
  resolve(666);
});
promise.then( (value) => {
  console.log(value);
});
console.log('outer promise'); // inner promise --> outer promise -> 666

// 6. promise chain, promise-then-taska-throw-err
// 本例我们主动throw一个错误，其实如果我们想主动进行onRejected调用，应该
// 返回一个Rejected状态的promise对象
function taskA() {
  console.log('Task A');
  throw new Error('Throw error @ Task A');
}

function taskB() {
  console.log('Task B'); // 不会被调用
}

function onRejected(error) {
  console.log('error comes: ' + error); // 'Throw error @ Task A'
}

function finalTask() {
  console.log('Final Task');
}

let promise = Promise.resolve();
promise
  .then(taskA)
  .then(taskB)
  .catch(onRejected)
  .then(finalTask);

// 7. 如何在promise chain中传递参数
// promise-then-passing-value in chain
function increment(value) {
  return value + 1;
}

function doubleUp(value) {
  return value * 2;
}

function output(value) {
  console.log(value); // => (1 + 1) * 2
}

let p = Promise.resolve(1);
p.then(increment).then(doubleUp).then(output).catch( (err) => { console.log(err); });

// 8. catch在ie8等es3环境下是保留字，不可用作方法名，因为需要中括号法
let promise = Promise.reject(new Error("message"));
promise.catch( (err) => {
  console.error(err);
});
// 很多工具可以帮助转化为promise["catch"]形式，或者你自己留心

// 9. 每次then方法调用都返回新promise而不是在原来promise对象上进行一连串链式调用
let aPromise = new Promise( (resolve) => {
  resolve(100);
});

let thenPromise = aPromise.then( (value) => {
  console.log(value);
});

let catchPromise = thenPromise.catch( (err) => {
  console.error(err);
});

console.log(aPromise !== thenPromise); // => true
console.log(thenPromise !== catchPromise); // => true

// 10. promise chain需要注意的一些地方
// 对同一个promise对象同时调用`then`方法
let aPromise = new Promise( (resolve) => {
  resolve(100);
});
aPromise.then( (value) => {
  return value * 2;
});
aPromise.then( (value) => {
  return value * 2;
});
aPromise.then( (value) => {
  console.log("1: " + value); // => 100
});

// 对`then`进行promise chain方式进行调用
let bPromise = new Promise( (resolve) => {
  resolve(100);
});
bPromise.then( (value) => {
  return value * 2;
}).then( (value) => {
  return value * 2;
}).then( (value) => {
  console.log("2: " + value); // 100 * 2 * 2
});

// 通过上面我们可以知道，非链式调用promise#then有很多弊端而且失去了意义，
// 是反模式的。下面一个例子很好的说明了:
function badAsyncCall() {
　let promise = Promise.resolve();
  promise.then(function() {
    // TODO: ...
    return newVal;
  });

  return promise;
}

// should 
function anAsyncCall() {
  let promise = Promise.resolve();
  return promise.then(function() {
    // TODO: ...
    return newVal;
  });
}

// 11. mutli xhr with Promise#then
// promise#then同时处理多个异步请求
function getURL(url) {
  return new Promise( (resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send(null);
  });
}

let request = {
  comment: function getComment() {
    return getURL('http://azu.github.io/promise-book/json/comment.json').then(JSON.parse);
  },
  people: function getPeople() {
    return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
  }
};

function main() {
  function recordValue(results, value) {
    results.push(value);
    return results;
  }
  // [] 用来保存初始化的值
  let pushValue = recordValue.bind(null, []);
  return request.comment().then(pushValue).then(request.people).then(pushValue);
}
// 运行的例子
main().then( (value) => {
  console.log(value);
}).catch( (error) => {
  console.error(error);
});

// 12. Promise#all
// promise#then同时处理多个异步请求
function getURL(url) {
  return new Promise( (resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send(null);
  });
}

let request = {
  comment: function getComment() {
    return getURL('http://azu.github.io/promise-book/json/comment.json').then(JSON.parse);
  },
  people: function getPeople() {
    return getURL('http://azu.github.io/promises-book/json/people.json').then(JSON.parse);
  }
};

function main() {
  return Promise.all([request.comment(), request.people()]);
}
// 运行示例
main().then( (value) => {
  console.log(value); // 与Promise.all传进来的任务顺序一致
}).catch( (error) => {
  console.log(error);
});

// 13. Promise-all-timers
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
  return new Promise( (resolve) => {
    setTimeout( () => {
      resolve(delay);
    }, delay);
  });
}
const startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.all([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128)
]).then( (values) => {
  console.log(Date.now() - startDate + 'ms');
  // 大约128ms
  console.log(values); // [1, 23, 64, 128]
});

// 14. Promise#race
// `delay`毫秒后执行resolve
function timerPromisefy(delay) {
  return new Promise( (resolve) => {
    setTimeout( () => {
      resolve(delay);
    }, delay);
  });
}
const startDate = Date.now();
// 所有promise变为resolve后程序退出
Promise.race([
  timerPromisefy(1),
  timerPromisefy(32),
  timerPromisefy(64),
  timerPromisefy(128)
]).then( (values) => {
  console.log(Date.now() - startDate + 'ms');
  // 大约128ms
  console.log(values); // [1, 23, 64, 128]
});

// 15. another promise-race-demo
let winnerPromise = new Promise( (resolve, reject) => {
  setTimeout( () => {
    resolve("I am winner!");
  }, 4);
});

let loserPromise = new Promise( (resolve, reject) => {
  setTimeout( () => {
    resolve("I am loser");
  }, 1000);
});

// 最快的promise转变为fulfilled就执行
Promise.race([winnerPromise, loserPromise]).then( (value) => {
  console.log(value); // 'I am winner'
});

// 16. bad throw
// 不能进行错误处理的onRejected
function throwError(value) {
  // throw error
  throw new Error(value);
}

function badMain(onRejected) {
  return Promise.resolve(42).then(throwError, onRejected);
}
function goodMain(onRejected) {
  return Promise.resolve(42).then(throwError).catch(onRejected);
}
badMain( () => {
  console.log("BAD");
});
goodMain( () => {
  console.log("GOOD");
});

// 17. Then-Catch-flow
// promise.then(onFulfilled).catch(onRejected);

// Promise测试 mocha

// 18. Promise应用
// wrapper the web notification api, no promise
// chrome47 pass ok!
function notifyMessage(message, options, callback) {
  if (Notification && Notification.permission === 'granted') {
    let notification = new Notification(message, options);
    callback(null, notification);
  } else if (Notification.requestPermission) {
    Notification.requestPermission( (status) => {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
      if (status === 'granted') {
        let notification = new Notification(message, options);
        callback(null, notification);
      } else {
        callback(new Error('user denied'));
      }
    });
  } else {
    callback(new Error('does\'t support Notification API!'));
  }
}

// 运行实例
// 第二个参数是传给`Notification`的option对象
notifyMessage('Hi', {}, (error, notification) => {
  if (error) {
    return console.error(error);
  }
  console.log(notification); // 通知对象
});

// 19. 用Promise来封装web Notification API
function notifyMessage(message, options, callback) {
  if (Notification && Notification.permission === 'granted') {
    let notification = new Notification(message, options);
    callback(null, notification);
  } else if (Notification.requestPermission) {
    Notification.requestPermission( (status) =>{
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
      if (status === 'granted') {
        let notification = new Notification(message, options);
        callback(null, notification);
      } else {
        callback(new Error('user denied'));
      }
    });
  } else {
    callback(new Error('does\' support Notification API'));
  }
}
function notifyMessageAsPromise(message, options) {
  return new Promise( (resolve, reject) => {
    notifyMessage(message, options, (error, notification) => {
      if (error) {
        reject(error);
      } else {
        resolve(notification);
      }
    });
  });
}
// 运行示例
notifyMessageAsPromise("Hi!").then( (notification) => {
  console.log(notification); // 通知对象
}).catch( (error) => {
  console.error(error);
});

// 20. Web Notification API as thenable
function notifyMessage(message, options, callback) {
  if (Notification && Notification.permission === 'granted') {
    let notification = new Notification(message, options);
    callback(null, notification);
  } else if (Notification.requestPermission) {
    Notification.requestPermission( (status) => {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
      if (status === 'granted') {
        let notification = new Notification(message, options);
        callback(null, notification);
      } else {
        callback(new Error('user denied'));
      }
    });
  } else {
    callback(new Error('doesn\'t support Notification API'));
  }
}
// 返回`thenable`
function notifyMessageAsThenable(message, options) {
  return {
    then(resolve, reject) {
      notifyMessage(message, options, (error, notification) => {
        if (error) {
          reject(error);
        } else {
          resolve(notification);
        }
      });
    }
  };
}
// 运行示例
Promise.resolve(notifyMessageAsThenable("message")).then( (notification) => {
  console.log(notification); // 通知对象
}).catch( (error) => {
  console.error(error);
});

// 21. prmise to Q-promise
// 不同类库以及native promise环境下可以通过thenable来共通
// Thenable多在类内部实现中使用，所以从外部来说不会经常看到Thenable的
// 使用，但是我们必须牢牢记住Thenable是Promise中一个非常重要的概念
const Q = require("Q");
// 这是ES6的promise对象
let promise = new Promise( (resolve) => {
  resolve(1);
});
// 变换为Q promise对象
Q(promise).then( (value) => {
  console.log(value);
}).finally( () => {
  console.log("finally");
});

// 22. 使用reject而不是throw
let promise = new Promise( (resolve, reject) => {
  throw new Error("message");
});
promise.catch( (error) => {
  console.error(error); // => "message"
});

// 可以改写为这样
let promise2 = new Promise( (resolve, reject) => {
  reject(new Error("message"));
});
promise2.catch( (error) => {
  console.error(error); // "message"
});

// 使用reject更为合理，原因在于我们很难区分throw是我们主动抛出来的还是
// 因为`真正的异常`导致的。而且在调试工具里，throw会引起异常的break行为
// 使其被捕获。

// 23. 在then中使用reject
let onRejected = console.log.bind(console);
let promise = Promise.resolve();
promise.then( () => {
  let retPromise = new Promise( (resolve, reject) => {
    reject(new Error("this promise is rejected"));
  });
  return retPromise;
}).catch(onRejected);

let onRejected2 = console.error.bind(console);
let promise2 = Promise.resolve();
promise2.then( () => {
  return Promise.reject(new Error("this promise is rejected in then"));
}).catch(onRejected);

// 24. deferred
// Deferred的话不需要将代码用Promise括起来
// 由于没有被嵌套在函数中，可以减少一层缩进
// 反过来没有Promise里的错误逻辑处理
// 调用resolve和reject的时机，函数都返回了promise对象
// 由于Deferred包含了promise，所以大体流程还是差不多的，不过Deferred有对Promise
// 进行操作的特权方法，以及高度自由的对流程控制进行定制
function Deferred() {
  this.promise = new Promise( (resolve, reject) => {
    this._resolve = resolve;
    this._reject = reject;
  });
}
Deferred.prototype.resolve = function(value) {
  this._resolve.call(this.promise, value);
};
Deferred.prototype.reject = function(reason) {
  this._reject.call(this.promise, reason);
};

function getURL(url) {
  const OK = 200;
  let deferred = new Deferred();
  let req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.onload = () => {
    if (req.status === OK) {
      deferred.resolve(req.responseText);
    } else {
      deferred.reject(new Error(req.statusText));
    }
  };
  req.onerror = () => {
    deferred.reject(new Error(req.statusText));
  };
  req.send();
  return deferred.promise;
}

// 运行示例
const URL = 'http://httpbin.org/get';
getURL(URL).then( (value) => {
  console.log(value);
}).catch(console.error); // 简写catch的resolver方法
// .catch( (error) => {
//   console.error(error);
// });

// 25. Deferred与Promise的区别
new Promise( (resolve, reject) => {
  // 在这里进行promise对象的状态确定
});
let deferred = new Deferred();
// 可以在任意的时机对`resolve`, `reject`方法进行调用
// 如果说Promise是对值进行抽象的话，Deferred则是对处理还
// 没有结束的状态或操作进行抽象化的对象，我们也可以从这一
// 层的区别来理解一下这两者之间的差异。
// 换句话说，Promise代表了一个对象，这个对象的状态现在还不确定，
// 但是未来一个时间点它的状态要不变为正常值要不变为异常值，而Deferred
// 对象表示了一个处理还没有结束的这种事实，在它的处理结束的时候可以通过
// Promise来取得处理的结果。

// 26. 让Promise等待指定时间
function delayPromise(ms) {
  return new Promise( (resolve) => {
    setTimeout(resolve, ms);
  })
}

setTimeout( () => {
  console.log("已经过了100ms");
}, 100);
// == 几乎同样的操作
delayPromise(100).then( () => {
  console.log("已经过了100ms");
});

// 27. Promise.race中的超时
// 第一种简单实现，挺巧妙的
// 将delayPromise和其他promise对象一起放到Promise.race中来实现简单的超时机制
let winnerPromise = new Promise( (resolve) => {
  setTimeout( () => {
    console.log("this is winner");
    resolve("this is winner");
  }, 4);
});
let loserPromise = new Promise( (resolve) => {
  setTimeout( () => {
    console.log("this is loser");
    reject('this is loser');
  }, 1000);
});
// 第一个promise变为resolve后程序停止
Promise.race([winnerPromise, loserPromise]).then( (value) => {
  console.log(value); // => 'this is winner'
});

// 28. 简单超时机制
// // simple-timeout-promise
function delayPromise(ms) {
  return new Promise( (resolve) => {
    setTimeout(resolve, ms);
  });
}
function timeoutPromise(promise, ms) {
  let timeout = delayPromise(ms).then( () => {
    throw new Error('Operation timed out after ' + ms + ' ms');
  });
  return Promise.race([promise, timeout]);
}

// 运行示例
let taskPromise = new Promise( (resolve) => {
  // 随便一些什么处理
  let delay = Math.random() * 2000;
  setTimeout( () => {
    resolve(delay + "ms");
  }, delay);
});
timeoutPromise(taskPromise, 1000).then( (value) => {
  console.log("taskPromise在规定时间内结束 : " + value);
}).catch( (error) => {
  console.error("发生超时 " + error);
});

// 29. 定制Error对象
function copyOwnFrom(target, source) {
  Object.getOwnPropertyNames(source).forEach( (propName) => {
    Object.defineProperty(target, propName, Object.getOwnPerpertyDescriptor(source, propName));
  });
  return target;
}
function TimeoutError() {
  let superInstance = Error.apply(null, arguments);
  copyOwnFrom(this, superInstance);
}
TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.constructor = TimeoutError;

let promise = new Promise( () => {
  throw TimeoutError("timeout");
});
promise.catch( (error) => {
  console.error(error instanceof TimeoutError); // true
});

// 30. 通过超时取消XHR操作
function cancleableXHR(url) {
  let req = new XMLHttpRequest();
  
  const OK = 200;
  let promise = new Promise( (resolve, reject) => {
    req.open('GET', url, true);
    req.onload = () => {
      if (req.status === OK) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.onabort = () => {
      reject(new Error('abort this request'));
    };
    req.send();
  });
  
  let abort = function () {
    // 如果request还没有结束的话就执行abort
    // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    if (req.readyState !== XMLHttpRequest.UNSENT) {
      req.abort();
    }
  };
  
  return {
    promise,
    abort
  } 
}

// 31. dalay-race-cancel-play
function copyOwnFrom(target, source) {
  Object.getOwnPropertyNames(source).forEach( (propName) => {
    Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
  });
  return target;
}
function TimeoutError() {
  let superInstance = Error.apply(null, arguments);
  copyOwnFrom(this, superInstance);
}
TimeoutError.prototype = Object.create(Error.prototype);
TimeoutError.prototype.constructor = TimeoutError;
function delayPromise(ms) {
  return new Promise( (resolve) => {
    setTimeout(resolve, ms);
  });
}
function timeoutPromise(promise, ms) {
  let timeout = delayPromise(ms).then( () => {
    return Promise.reject(new TimeoutError('Operation timed out after ' + ms + ' ms'));
  });
  return Promise.race([promise, timeout]);
}
function cancelableXHR(url) {
  let req = new XMLHttpRequest();
  let promise = new Promise( (resolve, reject) => {
    req.open('GET', url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    }
  });
  let abort = () => {
    // 如果request还没有结束的话就执行abort
    // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    if (req.readyState !== XMLHttpRequest.UNSENT) {
      req.abort();
    }
  };
  return {
    promise,
    abort
  }
}
let object = cancelableXHR('http://httpbin.org/get');
// main
timeoutPromise(object.promise, 1000).then( (contents) => {
  console.log('Contents', contents);
}).catch( (error) => {
  if (error instanceof TimeoutError) {
    object.abort();
    return console.log(error);
  }
  console.log('XHR Error: ', error);
});

// 32. cancelableXHR
let requestMap = {};
function createXHRPromise(url) {
  let req = new XMLHttpRequest();
  let promise = new Promise( (resolve, reject) => {
    req.open('GET', url, true);
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        delete requestMap[url];
      }
    };
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.onabort = () => {
      reject(new Error('abort this req.'));
    };
  });
  requestMap[url] = {
    promise, 
    request: req
  };
  return promise;
}

function abortPromise(promise) {
  if (typeof promise === void 0) {
    return;
  }
  let request;
  Object.keys(requestMap).some( (url) => {
    if (requestMap[url].promise === promise) {
      request = requestMap[url].request;
      return true;
    }
  });
  if (request != null && request.readyState !== XMLHttpRequest.UNSENT) {
    request.abort();
  }
  
  return {
    createXHRPromise,
    abortPromise
  }
}
import { cancelableXHR } from 'cancelableXHR';
let xhrPromise = cancelableXHR.createXHRPromise('http://httpbin.org/get'); // 创建包装了XHR的promise对象
xhrPromise.catch( (error) => {
  // 调用abort抛出的错误会在此被捕获
});
cancelableXHR.abortPromise(xhrPromise); // 取消在之前创建的promise对象的请求

// 33. Promise.prototype.done
// 非es6 Promise/Promise A+等在设计上的规范，很多库实现了各自的done
if (typeof Promise.prototype.done) {
  Promise.prototype.done = function(onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected).catch( (error) => {
      setTimeout( () => {
        throw error;
      }, 0);
    });
  };
} 

// let promise = Promise.resolve();
// promise.done( () => { 
//   JSON.parse('this is not json'); // SyntaxError: JSON.parse
// });
// 打开控制台可以看见

let promise2 = Promise.resolve();
promise2.then( () => {
  JSON.parse("this is not json");
}).catch( (error) => {
  console.error(error); // SyntaxError: JSON.parse
});

/**
 * 通过比较我们发现，两者之间存在一下不同点
 * done并不返回promise对象
 * done中发生的异常会被直接抛给外面，也就是不会进行Promise的错误处理
 * 放在方法链的最后
 */
 
 /**
  * 消失的错误
  * Promise虽然具备了强大的错误处理机制，但是（调试工具不能顺利运行
  * 的时候）这个功能会导致人为错误(human error)更加复杂，这也是
  * 它的一个缺点。
  * 也许你还记得我们在then or catch中也看到类似的内容
  */
  
function JSONPromise(value) {
  return new Promise( (resolve) => {
    resolve(JSON.parse(value));
  });
}
// 运行示例
let string ="非合法json编码字符串";
JSONPromise(string).then( (object) => {
  console.log(object);
}).catch( (error) => {
  // => JSON.parse抛出异常时
  console.error(error);
});
// 如果这个解析失败的异常被正确捕获的话则没什么问题，但是如果
// 编码时忘记处理该异常，那么查找异常发生的源头将变得非常棘手
// 这就是使用promise需要注意的一面
let string2 = "非合法json编码字符串";
JSONPromise(string2).then( (object) => {
  console.log(object);
}); // 为主动捕获错误

// 更难查找的错误，比如拼写错误
let string3 = "{}";
JSONPromise(string3).then( (object) => {
  conosle.log(object);
}); // 未主动捕获错误

/**
 * 总结:
 * 学习了非规范定义的方法done，了解了它的用处，基础和实现细节
 * 以及两个特点:
 * done中出现的错误会被作为异常抛出
 * 终结Promise chain
 * 为捕获异常的调试，随着调试工具或者原生实现以及库的改进，大
 * 多数情况下已经不是什么大的问题了。
 */

// 34. 顺序处理promise
// 还是以xhr为例
function getURL(url) {
  return new Promise( (resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = () => {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}
const request = {
  comment: function() {
    return getURL('http://azu.github.io/promise-book/json/comment.json').then(JSON.parse);
  },
  people: function() {
    return getURL('http://azu.github.io/promise-book/json/people.json').then(JSON.parse);
  }
};
function main() {
  function recordValue(results, value) {
    results.push(value);
    return results;
  }
  let pushValue = recordValue.bind(null, []);
  let tasks = [request.comment, request.people];
  return tasks.reduce( (promise, task) => {
    return promise.then(task).then(pushValue);
  }, Promise.resolve());
}
// 运行示例
main().then( (value) => {
  console.log(value);
}).catch( (error) => {
  console.error(error);
});

// 虽然简洁，但是在可读性上差了些，下面改进一下
// 为了能实现一下效果
`
 let tasks2 = [request.comment, request.people];
 sequenceTasks(tasks);
`
function sequenceTasks(tasks) {
  function recordValue(results, value) {
    results.push(value);
    return results;
  }
  let pushValue = recordValue.bind(null, []);
  return tasks.reduce( (promise, task) => {
    return promise.then(task).then(pushValue);
  }, Promise.resolve());
}

// 只需要改写main函数
function main() {
  return sequenceTasks([request.comment, request.people]);
}
main().then( (value) => {
  console.log(value);
}).catch( (error) => {
  console.error(error);
});

