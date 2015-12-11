/*******************************************************
    > File Name: promise-relearn-with-es2015.js
    > Author: IndexXuan
    > Mail: indexxuan@gmail.com
    > Created Time: 2015年12月11日 星期五 08时12分28秒
 ******************************************************/

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
var promise = Promise.resolve($.ajax('/json/comment.json')); // => promise对象
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
console.log('outer promise');

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

var promise = Promise.resolve();
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
  var promise = Promise.resolve();
  promise.then(function() {
    // TODO: ...
    return newVal;
  });

  return promise;
}

// should 
function anAsyncCall() {
  var promise = Promise.resolve();
  return promise.then(function() {
    // TODO: ...
    return newVal;
  });
}

// 11. mutli xhr with Promise#then
// promise#then同时处理多个异步请求
function getURL(url) {
  return new Promise( (resolve, reject) => {
    var req = new XMLHttpRequest();
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

var request = {
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
  var pushValue = recordValue.bind(null, []);
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
    var req = new XMLHttpRequest();
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

var request = {
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
var winnerPromise = new Promise( (resolve, reject) => {
  setTimeout( () => {
    resolve("I am winner!");
  }, 4);
});

var loserPromise = new Promise( (resolve, reject) => {
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
    var notification = new Notification(message, options);
    callback(null, notification);
  } else if (Notification.requestPermission) {
    Notification.requestPermission( (status) => {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
      if (status === 'granted') {
        var notification = new Notification(message, options);
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

