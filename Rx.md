RxJS是一个强大的Reactive编程库，提供了强大的数据流组合与控制能力，但是其学习门槛一直很高，本次分享期望从一些特别的角度解读它在业务中的使用，而不是从API角度去讲解。

RxJS简介

通常，对RxJS的解释会是这么一些东西，我们来分别看看它们的含义是什么。

Reactive
Lodash for events
Observable
Stream-based
什么是Reactive呢，一个比较直观的对比是这样的：

比如说，abc三个变量之间存在加法关系：

a = b + c
在传统方式下，这是一种一次性的赋值过程，调用一次就结束了，后面b和c再改变，a也不会变了。

而在Reactive的理念中，我们定义的不是一次性赋值过程，而是可重复的赋值过程，或者说是变量之间的关系：

a: = b + c
定义出这种关系之后，每次b或者c产生改变，这个表达式都会被重新计算。不同的库或者语言的实现机制可能不同，写法也不完全一样，但理念是相通的，都是描述出数据之间的联动关系。

在前端，我们通常有这么一些方式来处理异步的东西：

回调
事件
Promise
Generator
其中，存在两种处理问题的方式，因为需求也是两种：

分发
流程
在处理分发的需求的时候，回调、事件或者类似订阅发布这种模式是比较合适的；而在处理流程性质的需求时，Promise和Generator比较合适。

在前端，尤其交互很复杂的系统中，RxJS其实是要比Generator有优势的，因为常见的每种客户端开发都是基于事件编程的，对于事件的处理会非常多，而一旦系统中大量出现一个事件要修改视图的多个部分（状态树的多个位置），分发关系就更多了。

RxJS的优势在于结合了两种模式，它的每个Observable上都能够订阅，而Observable之间的关系，则能够体现流程（注意，RxJS里面的流程的控制和处理，其直观性略强于Promise，但弱于Generator）。

我们可以把一切输入都当做数据流来处理，比如说：

用户操作
网络响应
定时器
Worker
RxJS提供了各种API来创建数据流：

单值：of, empty, never
多值：from
定时：interval, timer
从事件创建：fromEvent
从Promise创建：fromPromise
自定义创建：create
创建出来的数据流是一种可观察的序列，可以被订阅，也可以被用来做一些转换操作，比如：

改变数据形态：map, mapTo, pluck
过滤一些值：filter, skip, first, last, take
时间轴上的操作：delay, timeout, throttle, debounce, audit, bufferTime
累加：reduce, scan
异常处理：throw, catch, retry, finally
条件执行：takeUntil, delayWhen, retryWhen, subscribeOn, ObserveOn
转接：switch
也可以对若干个数据流进行组合：

concat，保持原来的序列顺序连接两个数据流
merge，合并序列
race，预设条件为其中一个数据流完成
forkJoin，预设条件为所有数据流都完成
zip，取各来源数据流最后一个值合并为对象
combineLatest，取各来源数据流最后一个值合并为数组
这时候回头看，其实RxJS在事件处理的路上已经走得太远了，从事件到流，它被称为lodash for events，倒不如说是lodash for stream更贴切，它提供的这些操作符也确实可以跟lodash媲美。

数据流这个词，很多时候，是从data-flow翻译过来的，但flow跟stream是不一样的，我的理解是：flow只关注一个大致方向，而stream是受到更严格约束的，它更像是在无形的管道里面流动。

那么，数据的管道是什么形状的？

在RxJS中，存在这么几种东西：

Observable 可观察序列，只出不进
Observer 观察者，只进不出
Subject 可出可进的可观察序列，可作为观察者
ReplaySubject 带回放
Subscription 订阅关系
前三种东西，根据它们数据进出的可能性，可以通俗地理解他们的连接方式，这也就是所谓管道的“形状”，一端密闭一端开头，还是两端开口，都可以用来辅助记忆。

上面提到的Subscription，则是订阅之后形成的一个订阅关系，可以用于取消订阅。

下面，我们通过一些示例来大致了解一下RxJS所提供的能力，以及用它进行开发所需要的思路转换。

示例一：简单的订阅

很多时候，我们会有一些显示时间的场景，比如在页面下添加评论，评论列表中显示了它们分别是什么时间创建的，为了含义更清晰，可能我们会引入moment这样的库，把这个时间转换为与当前时间的距离：

const diff = moment(createAt).fromNow()
这样，显示的时间就是：一分钟内，昨天，上个月这样的字样。

但我们注意到，引入这个转换是为了增强体验，而如果某个用户停留在当前视图时间太长，它的这些信息会变得不准确，比如说，用户停留了一个小时，而它看到的信息还显示：5分钟之前发表了评论，实际时间是一个小时零5分钟以前的事了。

从这个角度看，我们做这个体验增强的事情只做了一半，不准确的信息是不能算作增强体验的。

在没有RxJS的情况下，我们可能会通过一个定时器来做这件事，比如在组件内部：

tick() {
  this.diff = moment(createAt).fromNow()
  setTimeout(tick.bind(this), 1000)
}
但组件并不一定只有一份实例，这样，整个界面上可能就有很多定时器在同时跑，这是一种浪费。如果要做优化，可以把定时器做成一种服务，把业务上需要周期执行的东西放进去，当作定时任务来跑。

如果使用RxJS，可以很容易做到这件事：

Observable.interval(1000).subscribe(() => {
  this.diff = moment(createAt).fromNow()
})
示例二：对时间轴的操纵

RxJS一个很强大的特点是，它以流的方式来对待数据，因此，可以用一些操作符对整个流上所有的数据进行延时、取样、调整密集度等等。

const timeA$ = Observable.interval(1000)
const timeB$ = timeA$.filter(num => {
    return (num % 2 != 0)
      && (num % 3 != 0)
      && (num % 5 != 0)
      && (num % 7 != 0)
  })

const timeC$ = timeB$.debounceTime(3000)
const timeD$ = timeC$.delay(2000)
示例代码中，我们创建了四个流：

A是由定时器产生的，每秒一个值
B从A里面过滤掉了一些
C在B的基础上，对每两个间距在3秒之内的值进行了处理，只留下后一个值
D把C的结果整体向后平移了2秒
所以结果大致如下：

A: 0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21
B:    1                             11    13          17    19
C:          1                                   13                19
D:                1                                   13
示例三：我们来晚了

RxJS还提供了BehaviourSubject和ReplaySubject这样的东西，用于记录数据流上一些比较重要的信息，让那些“我们来晚了”的订阅者们回放之前错过的一切。

ReplaySubject可以指定保留的值的个数，超过的部分会被丢弃。

最近新版《射雕英雄传》比较火，我们来用代码描述其中一个场景。

郭靖和黄蓉一起背书，黄蓉记忆力很好，看了什么，就全部记得；而郭靖属鱼的，记忆只有七秒，始终只记得背诵的最后三个字，两人一起背诵《九阴真经》。
代码实现如下：

const 九阴真经 = '天之道，损有余而补不足'

const 黄蓉$ = new ReplaySubject(Number.MAX_VALUE)
const 郭靖$ = new ReplaySubject(3)

const 读书$ = Observable.from(九阴真经.split(''))

读书$.subscribe(黄蓉$)
读书$.subscribe(郭靖$)
执行之后，我们就可以看到，黄蓉背出了所有字，郭靖只记得“补不足”三个字。

示例四：自动更新的状态树

熟悉Redux的人应该会对这样一套理念不陌生：

当前视图状态 := 之前的状态 + 本次修改的部分
从一个应用启动之后，整个全局状态的变化，就等于初始的状态叠加了之后所有action导致的状态修改结果。

所以这就是一个典型的reduce操作。在RxJS里面，有一个scan操作符可以用来表达这个含义，比如说，我们可以表达这样一个东西：

const action$ = new Subject()
const reducer = (state, payload) => {
  // 把payload叠加到state上返回
}

const state$ = action$.scan(reducer)
  .startWith({})
只需往这个action$里面推action，就能够在state$上获取出当前状态。

在Redux里面，会有一个东西叫combineReducer，在state比较大的时候，用不同的reducer修改state的不同的分支，然后合并。如果使用RxJS，也可以很容易表达出来：

const meAction$ = new Subject()
const meReducer = (state, payload) => {}

const articleAction$ = new Subject()
const articleReducer = (state, payload) => {}

const me$ = meAction$.scan(meReducer).startWith({})
const article$ = articleAction$.scan(articleReducer).startWith({})

const state$ = Observable
  .zip(
    me$,
    article$,
    (me, article) => {me, article}
  )
借助这样的机制，我们实现了Redux类似的功能，社区里面也有基于RxJS实现的Redux-Observable这样的Redux中间件。

注意，我们这里的代码中，并未使用dispatch action这样的方式去严格模拟Redux。

再深入考虑，在比较复杂的场景下，reducer其实很复杂。比如说，视图上发起一个操作，会需要修改视图的好多地方，因此也就是要修改全局状态树的不同位置。

在这样的场景中，从视图发起的某个action，要么调用一个很复杂的reducer去到处改数据，要么再次发起多个action，让很多个reducer各自改自己的数据。

前者的问题是，代码耦合太严重；后者的问题是，整个流程太难追踪，比如说，某一块状态，想要追踪到自己是被从哪里发起的修改所改变的，是非常困难的事情。

如果我们能够把Observable上面的同步修改过程视为reducer，就可以从另外一些角度大幅简化代码，并且让联动逻辑清晰化。例如，如果我们想描述一篇文章的编辑权限：

const editable$ = Observable.combineLatest(article$, me$)
  .map(arr => {
    let [article, me] = arr
    return me.isAdmin || article.author === me.id
  })
这段代码的实质是什么？其实本质上还是reducer，表达的是数据的合并与转换过程，而且是同步的。我们可以把article和me的变更reduce到article$和me$里，由它们派发隐式的action去推动editable计算新值。

更详细探索的可以参见之前的这篇文章：复杂单页应用的数据层设计

示例五：幸福人生

人生是什么样子的呢？

著名央视主持人白岩松曾经说过：

赚钱是为了买房，买房是为了赚钱。
这两句话听上去很悲哀，却很符合社会现实。（不要在意是不是白岩松说的啦，不是他就是鲁迅，要么就是莎士比亚）

作为程序员，我们可以尝试想想如何用代码把它表达出来。

如果用命令式编程的理念来描述这段逻辑，是不太好下手的，因为它看起来像个死循环，可是人生不就是一天一天的死循环吗，这个复杂的世界，谁是自变量，谁是因变量？

死循环之所以很难用代码表达，是因为你不知道先定义哪个变量，如果变量的依赖关系形成了闭环，就总有一段定义不起来。

但是，在RxJS这么一套东西中，我们可以很容易把这套关系描述出来。前面说过，基于RxJS编程，就好像是在组装管道，依赖关系其实是定义在管道上，而不是在数据上。所以，不存在命令式的那些问题，只要管道能够接起来，再放进去数据就可以了。所以，我们可以先定义管道之间的依赖关系，

首先，从这段话中寻找一些变量，得到如下结果：

钱
房
然后，我们来探索它们各自的来源。

钱从哪里来？
出租房子。
房子从哪里来？
钱挣够了就买。
听上去还是死循环啊？

我们接着分析：

钱是只有一个来源吗？
不是，原始积累肯定不是房租，我们假定那是工资。所以，收入是有工资和房租两个部分组成。
房子是只有一个来源吗？
对，我们不是贪官，房子都是用钱买的。
好，现在我们有四个变量了：

钱
房
工资
房租
我们尝试定义这些变量之间的关系：

工资 := 定时取值的常量
房租 := 定时取值的变量，与房子数量成正比
钱 := 工资 + 房租
房 := 钱.map(够了就买)
调整这些变量的定义顺序，凡是不依赖别人的，一律提到最前面实现。尴尬地发现，这四个变量里，只有工资是一直不变的，先提前。

const salary$ = Observable.interval(100).mapTo(2)
剩下的，都是依赖别人的，而且，没有哪个东西是只依赖已定义的变量，在存在业务上的循环依赖的时候，就会发生这样的情况。在这种情况下，我们可以从中找出被依赖最少的变量，声明一个Subject用于占位，比如这里的房子。

const house$ = new Subject()
接下来再看，以上几个变量中，有哪个可以跟着确定？是房租，所以，我们可以得到房租与房子数量的关系表达式，注意，以上的salary$、house$，表达的都是单次增加的值，不代表总的值，但是，算房租是要用总的房子数量来算的，所以，我们还需要先表达出总的房子数量：

const houseCount$ = house$.scan((acc, num) => acc + num, 0).startWith(0)
然后，可以得到房租的表达式：

const rent$ = Observable.interval(3000)
  .withLatestFrom(houseCount$)
  .map(arr => arr[1] * 5)
解释一下上面这段代码：

房租由房租周期的定时器触发
然后到房子数量中取最后一个值，也就是当前有多少套房
然后，用房子数量乘以单套房的月租，假设是5
房租定义出来了之后，钱就可以被定义了：

const income$ = Observable.merge(salary$, rent$)
注意，income$所代表的含义是，所有的单次收入，包含工资和房租。

到目前为止，我们还有一个东西没有被定义，那就是房子。如何从收入转化为房子呢？为了示例简单，我们把它们的关系定义为：

一旦现金流够买房，就去买。

所以，我们需要定义现金流与房子数量的关系：

const cash$ = income$
  .scan((acc, num) => {
    const newSum = acc + num

    const newHouse = Math.floor(newSum / 100)
    if (newHouse > 0) {
      house$.next(newHouse)
    }

    return newSum % 100
  }, 0)
这段逻辑的含义是：

累积之前的现金流与本次收入
假定房价100，先看看现金够买几套房，能买几套买几套
重新计算买完之后的现金
总结一下，这么一段代码，就表达清楚了我们所有的业务需求：

// 挣钱是为了买房，买房是为了赚钱
const house$ = new Subject()
const houseCount$ = house$.scan((acc, num) => acc + num, 0).startWith(0)

// 工资始终不涨
const salary$ = Observable.interval(100).mapTo(2)
const rent$ = Observable.interval(3000)
  .withLatestFrom(houseCount$)
  .map(arr => arr[1] * 5)

// 一买了房，就没现金了……
const income$ = Observable.merge(salary$, rent$)
const cash$ = income$
  .scan((acc, num) => {
    const newSum = acc + num

    const newHouse = Math.floor(newSum / 100)
    if (newHouse > 0) {
      house$.next(newHouse)
    }

    return newSum % 100
  }, 0)

// houseCount$.subscribe(num => console.log(`houseCount: ${num}`))
// cash$.subscribe(num => console.log(`cash: ${num}`))
这段代码所表达出来的业务关系如图：

            工资周期  ———>  工资
                            ↓
房租周期  ———>  租金  ———>  收入  ———>  现金 
                ↑           ↓ 
             房子数量 <——— 新购房
注意：在这个例子中，house$的处理方式与众不同，因为我们的业务逻辑是环形依赖，至少要有一个东西先从里面拿出来占位，后续再处理，否则没有办法定义整条链路。

小结

本篇通过一些简单例子介绍了RxJS的使用场景，可以用这么一句话来描述它：

其文简，其意博，其理奥，其趣深
RxJS提供大量的操作符，用于处理不同的业务需求。对于同一个场景来说，可能实现方式会有很多种，需要在写代码之前仔细斟酌。由于RxJS的抽象程度很高，所以，可以用很简短代码表达很复杂的含义，这对开发人员的要求也会比较高，需要有比较强的归纳能力。

本文是入职蚂蚁金服之后，第一次内部分享，科普为主，后面可能会逐步作一些深入的探讨。

蚂蚁的大部分业务系统前端不太适合用RxJS，大部分是中后台CRUD系统，因为两个原因：整体性、实时性的要求不高。

什么是整体性？这是一种系统设计的理念，系统中的很多业务模块不是孤立的，比如说，从展示上，GUI与命令行的差异在于什么？在于数据的冗余展示。我们可以把同一份业务数据以不同形态展示在不同视图上，甚至在PC端，由于屏幕大，可以允许同一份数据以不同形态同时展现，这时候，为了整体协调，对此数据的更新就会要产生很多分发和联动关系。

什么是实时性？这个其实有多个含义，一个比较重要的因素是服务端是否会主动向推送一些业务更新信息，如果用得比较多，也会产生不少的分发关系。

在分发和联动关系多的时候，RxJS才能更加体现出它比Generator、Promise的优势。
