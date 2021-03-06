
## 起源
1956年在 `神经网事件的表示法` 论文中引入了正则表达式的概念

随后，发现可以将这一工作应用到使用Ken Thompson的计算搜索算法的一些早期研究中，而Ken Thompson有时 `Unix`　的主要研发  
因此 `qed` 编辑器成了第一个使用正则表达式的应用程序

## 正则表达式的定义

正则表达式是由普通字符和特殊字符（也称为元字符或限定字符）组成的文字模板，如下便是简单的匹配连续数字的正则表达式

  - e.g.
  - /[0-9]+/
  - /\d+/

  ### 元字符
  .  匹配除换行符以外的任意字符
  \d 匹配数字，等价于[0-9]
  \w 匹配字母，数字，下划线或汉字
  \s 匹配任意的空白符（包括制表符，空格，换行）
  \b 匹配单词开始和结束的位置，即单词边界
  ^  匹配行首
  $  匹配行尾

  ### 反义元字符
  \D
  \W
  \S
  \B
  [^x]

  ### 重复限定符
  *
  +
  ?
  {n} x = n
  {n,} x >= n
  {n,m} n <= x <= m // 不能有空格... 和代码中风格不一样

　### 字符组
  [xyz]: 匹配中括号中字符之一,如果元字符在中括号中，则元字符降级为普通字符，不再具有元字符的功能: [+.?]

  ### 排除性字符组
  [^...]

  ### 多选结构
  a|b　标示匹配a或者b

  ### 转义字符
  \　即为转义字符，通常\ * + ? | { [ () ] } ^ $ . # 和空白都需要转义
  
  ### 操作符的优先级
  1. \ '转义符'
  2. (), (?:) (?=), []
  3. * + ? {n} {n,} {n,m}
  4. ^ $ '位置' 
  5. | '或操作'

  ### 修饰符
  g
  i
  m
  y(es6+,粘连修饰符)
  u(es6+)

  ### 常用正则表达式
  1. 汉字  : ^[\u4e00-\u9fa5]{0,}$
  2. Email : ^\w+([-+.]=w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
  3. URL   : `^https?://([\w-]+.)+[\w-]+(/[\w-./?%&=]*)?$`
  4. 手机  : ^1\d{10}$
  5. 身份证: ^(\d{15}|\d{17}(\d|X))$

  ### 正则表达式门派
  基本正则表达式   BREs
  扩展的正则表达式 EREs => js支持此种
  Perl的正则表达式 PREs

  ### linux & oxs下常用命令与正则表达式的关系
  grep
  egrep
  sed
  awk

  ### 正则表达式初阶技能
  贪婪模式和非贪婪模式
  默认情况下，所有的限定词都是贪婪模式，尽可能多的去捕获字符，而在限定词后增加?，则是非贪婪模式
  e.g.
  var str = "aaab"
  var re1 = /a+/
  var re2 = /a+?/
  console.log(str.match(re1)) // ["aaa"]
  console.log(str.match(re2)) // ["a"]

  实际上非贪婪模式非常有效，特别当匹配到html标签时，比如匹配一个成对儿出现的div,方案一可能会匹配很多div标签
  而方案二则只会匹配一个div标签对
  var str = '<div class="v1"><div class="v2">test</div><input type="text" /></div>'
  var re1 = /<div.*<\/div>/
  var re2 = /div.*?<\/div>/

  ### 区间量词的非贪婪模式
  除了 *? +?, {n,m} 区间量词也是匹配优先，虽然匹配次数有上限，但是在达到上线之前，它依然是尽可能多的匹配
  使用非贪婪模式就是在区间限制下也尽量少匹配

  注意点:
  能达到同样的匹配结果的贪婪模式与非贪婪模式，通常是贪婪模式的匹配效率高
  所有的非贪婪模式，都可以通过修改量词修饰的子表达式，转换为贪婪模式
  贪婪模式可以与固话分组结合，提升匹配效率，而非贪婪模式缺不可以

  ### 分组
  正则的分组主要通过小括号来实现，括号包裹的子表达式作为一个分组，括号后可以紧跟限定量词表达式重复次数，如下
  小括号内包裹的abc便是一个分组
  /(abc)+/.test('abc123') === true
  那么分组有什么用？一般来说，分组是为了方便的标示重复次数，除此之外，还有一个作用就是用于捕获

  #### 捕获型分组
  捕获型分组，通常由一对小括号加上子表达式组成，捕获型分组会创建反向作用，每个反向作用都由一个编号或名称来标识
  js中主要是通过 `$+编号` 或者 `\+编号` 表示法进行引用(从１开始)，如下便是一个捕获型分组的例子
  var color = "#808080"
  var output = color.replace(/#(\d+)/, "$1" + "~~") // 也可以"$1~~"

  ### 非捕获型分组
  非捕获型分组，通常由一对括号加上"?:",加上子表达式组成，非捕获型分组不会创建反向引用，就好像没有括号一样
  var color = '#808080'
  var output = color.replace(/#(?:\d)+/, "$1~~")
  console.log(RegExp.$1) // ""
  console.log(output) // "$1~~"

  ### 固话分组... 没太懂

  ### 正则表达式高阶技能，零宽断言
  零宽断言又叫做环视，环视指进行子表达式的匹配，匹配到的内容不保存到最终的匹配结果，由于匹配是零宽度的
  故最终匹配到的只是一个位置
  环视按照方向划分，有顺序和逆序两种，也叫做前瞻和后瞻，按照是否匹配有肯定和否定两种，组合之，便有４种

  (?:pattern)  非捕获型分组
    /abcd(?:e)/ 匹配abcde

  (?=pattern)  顺序肯定环视
    /Windows(?=2000)/ 匹配 `Windows2000` 中的，不匹配 `Windows3.1` 中的

  (?!pattern)  顺序否定环视
    /Windows(?!2000)/ 匹配 `Windows3.1` 中的，不匹配 `Windows2000`

  (?<=pattern) 逆向肯定环视
    /(?<=Office)2000/ 匹配 `Office2000` 中的，不匹配 `Windows2000`

  (?<!pattern) 逆向否定环视
    /(?<!Office)2000/ 匹配 `Windows2000` 中的，不匹配 `Office2000`

  - 助记: 
    `?:` 代表非捕获分组
    `?=` 代表肯定, `?!` 代表否定
    `<`  代表逆向与否

  #### 
  非捕获分组由于结构与环视类似，故列在表中，以做对比，以上４种环视中，目前js只支持前两种即：顺序肯定与顺序否定

  e.g.
  var str = '123abc789', s
  s = str.replace(/abc/, '456') // 普通匹配替换
  console.log(s) // 123456789

  s = str.replace(/3(?=abc)/, 3456) // 匹配位置，没有宽度
  console.log(s) // 123456abc789

  s = str.replace(/3(?!abc)/, 3456) // 未匹配
  console.log(s) // 123abc789

  ### 实战

  ####
  var responseText = '<div data="dev.xxx.txt"</div><img src="dev.xxx.png" />'
  我们替换img的src属性中的 `dev` 为 `test`
  var reg = /dev(?=[^']*png)/
  var str = responseText.replace(reg, 'test') 
  console.log(str) // 

  ####
  千分位
  function thousand (str) {
    return str.replace(/(?!^)(?=([0-9]{3})+$)/g, ',')
  }

  拆解:
    (?!^)代表不匹配字符开头，当然，开头弄什么千分位分隔符啊
    (?=([0-9]{3})+$)代表零宽度的匹配到字符串结尾的(至少有一组)每三个数字一组的 `位置`，是个位置
    这样就排除了开头，匹配到结尾，全局匹配，而且一次匹配完毕无回溯，替换相应空位，实现千分位分割

  ### RegExp对象
  表示正则表达式对象，主要用于对字符串进行模式匹配
  new RegExp(pattern[, flags])
  参数pattern是个字符串，指定了正则表达式字符串或其他的正则表达式对象
  参数flags是个可选的，包含 `g`, `i`, `m` 等分别表示匹配范围的标识


  var tpl = " Hello ${world}, I\' am ${name} from ${ city } "

  function output (temp, data) {
    return temp.replace(/\$\{\s*(\w*)\s*\}/g, function (all, match) {
      console.log(all, match)
      return data[match]
    })
  }

  output(tpl, data) // Hello World, I' am pengrui from xuzhou

