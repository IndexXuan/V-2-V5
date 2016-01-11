/**
  File   : dom.js
  Author : IndexXuan(https://github.com/IndexXuan)
  Mail   : indexxuan@gmail.com
  Date   : 2016年01月08日 星期五 15时43分19秒
*/

/**
 * 操作dom：
 *
 * 由于HTML文档被浏览器解析后就是一颗dom树，要改变HTML的结构，就需要通过js来操作dom
 * 始终记住dom是一个树形结构，操作dom节点实际上就是这么几个操作
 *
 * 添加
 * 删除
 * 遍历
 * 更新
 */

// 添加 先创建或找到一个节点，然后插入到dom树里
// innerHTML插入大片dom节点
// appendChild: Element.appendChild(newElement) 插入到Element的最后一个子节点
// insertBefore: parentElement.insertBefore(newElement, referenceElement)

// 删除 找到父节点，然后removeChild即可
var self = document.getElementById('to-be-removed')
var parent = self.parentElement
var removed = parent.removeChild(self)
removed === self

// 遍历同树的遍历

// 更新dom 拿到dom节点后，我们可以对它进行更新
// innerHTML, 避免xss，需要对输入的html编码
// textContent & innerText 来修改内容，不够灵活但足够安全，可确保只有内容改变，无标签生成

附录: 常用dom操作方法集合
document.createRange()

document.createTextNode()
document.createElement()
document.cloneNode(isDeep)

element..parentNode
element.childNodes
element.nextSibling
element.previousSibling

element.parent
element.children
element.nextElementSibling
element.previousSibling

document.querySelector
document.querySelectorAll
document.getElementById
document.getElementsByTagName
document.getElementsByName
document.getElementsByClass

element.appendChild
element.insertBefore
element.removeChild
element.replaceChild

element.setAttribute
element.getAttribute
element.textContent

element.addEventListener
element.removeEventListener
event.dispatch
document.createEvent

getComputedStyle
getClientBoundingRect
getClientRects

