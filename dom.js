/**
 *  dom utils
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Fri 16 Dec 2016 10:35:08 AM CST
 */

/* eslint no-unused-expressions: 0 */
const reUnit = /width|height|top|left|right|bottom|margin|padding/i
let amId = 1
const _amDisplay = {}

let requestAnimationFrame
if (typeof window !== 'undefined') {
    requestAnimationFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60)
        }
} else {
    requestAnimationFrame = function () {
        throw new Error('requestAnimationFrame is not support, may be you are running in the server side')
    }
}

// getter is setter
function getAmId (obj) {
    return obj._amId || (obj._amId = _amId++)
}

function setAmDisplay (elem, display) {
    const id = getAmId(elem)
    _amDisplay[`_am_${id}`] = display
}

function getAmDisplay (elem) {
    const id = getAmId(elem)
    _amDisplay[`_am_${id}`] = display
}

export default {
    // el can be Element, NodeList or selector
    addClass (el, className) {
        if (typeof el === 'string') el = document.querySelectorAll(el)
        const els = (el instanceof NodeList) ? [].slice.call(el) : [el]
        els.forEach(e => {
            if (this.hasClass(e, className)) { return }

            if (e.classList) {
                e.classList.add(className)
            } else {
                e.className += ' ' + className
            }
        })
    },

    // el can be Element, NodeList or selector
    removeClass (el, className) {
        if (typeof el === 'string') el = document.querySelectorAll(el)
        const els = (el instanceof NodeList) ? [].slice.call(el) : [el]

        els.forEach(e => {
            if (this.hasClass(e, className)) {
                if (e.classList) {
                    e.classList.remove(className)
                }
            } else {
                e.className = e.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
            }
        })
    },

    // el can be Element or selector
    hasClass (el, className) {
        if (typeof el === 'string') el = document.querySelector(el)
        if (el.classList) {
            return el.classList.contains(className)
        }
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
    },

    toggleClass (el, className) {
        if (typeof el === 'string') el = document.querySelector(el)
        const flag = this.hasClass(el, className)
        if (flag) {
            this.removeClass(el, className)
        } else {
            this.addClass(el, className)
        }
        return flag
    },

    // newEl insert after targetEl
    insertAfter (newEl, targetEl) {
        const parent = targetEl.parentNode
        if (parent.lastChild === targetEl) {
            parent.appendChild(newEl)
        } else {
            parent.insertBefore(newEl, targetEl.nextSibling) // nextSibling before is targetEl after, so it is insert after
        }
    },

    remove (el) {
        if (typeof el === 'string') {
            [].forEach.call(document.querySelectorAll(el), node => {
                node.parentNode.removeChild(node)
            })
        } else if (el.parentNode) {
            // it's an Element
            el.parentNode.removeChild(el)
        } else if (el instanceof NodeList) {
            // it's an array of elements
            [].forEach.call(el, node => {
                node.parentNode.removeChild(node)
            })
        } else {
            throw new Error('you can only pass Element, array of Element or query string as argument')
        }
    },

    forceReflow (el) {
        el.offsetHeight
    },

    getDocumentScrollTop () {
        // IE8 used `document.documentElement`
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    },

    // Set the current vertical position of the scroll bar for document
    // Note: do not support fixed position of body
    setDocumentScrollTop (value) {
        window.scrollTo(value)
        return value
    },

    outerHeight (el) {
        return el.offsetHeight
    },

    outerHeightWithMargin (el) {
        let height = el.offsetHeight
        const style = window.getComputedStyle(el)
        height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0)
        return height
    },

    outerWidth (el) {
        return el.offsetWidth
    },

    outerWidthWithMargin (el){
        let width = el.offsetWidth
        const style = window.getComputedStyle(el)
        width += (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0)
        return width
    },

    getComputedStyle (el) {
        return el.ownerDocument.defaultView.getComputedStyle(el, null)
    },

    getOffset(el) {
        const html = el.ownerDocument.documentElement
        let box = { top: 0, left: 0 }

        // If we don't have gBCR, just use 0, 0 rather than error
        // BlackBerry 5, iOS 3 (origin iPhone)
        if (typeof el.getBoundingClientRect !== 'undefined') {
            box = el.getBoundingClientRect()
        }

        return {
            top: box.top + window.pageYOffset - html.clientTop,
            left: box.left + window.pageXOffset - html.clientLeft
        }
    },

    getPosition (el) {
        if (!el) {
            return {
                left: 0,
                top: 0
            }
        }

        return {
            left: el.offsetLeft,
            top: el.offsetTop
        }
    },

    setStyle (node, att, val, style) {
        style = style || node.style
        if (style) {
            if (val === null || val === '') { // normalize unsetting
                val = ''
            } else if (!isNaN(Number(val)) && reUnit.test(att)) {
                val += 'px'
            }
        }

        if (att === '') {
            att = 'cssText'
            val = ''
        }

        style[att] = val
    },

    setStyles (el, hash) {
        const HAS_CSSTEXT_FEATURE = typeof(el.style.cssText) !== 'undefined'
        function trim (str) {
            return str.replace(/^\s+|\s+$/g, '')
        }
        let originStyleText
        const originStyleObj = {}
        if (!!HAS_CSSTEXT_FEATURE) {
            originStyleText = el.style.cssText
        } else {
            originStyleText = el.getAttribute('style')
        }
        originStyleText.split(';').forEach(item => {
            if(item.indexOf(':') !== -1) {
                const obj = item.split(':')
                originStyleObj[trim(obj[0])] = trim(obj[1])
            }
        })

        const styleObj = {}
        Object.keys(hash).forEach(item => {
            this.setStyle(el, item, hash[item], styleObj)
        })
        const mergedStyleObj = Object.assign({}, originStyleObj, styleObj)
        const styleText = Object.keys(mergedStyleObj)
            .map(item => item + ': ' + mergedStyleObj[item] + ';')
            .join(' ')

            if (!HAS_CSSTEXT_FEATURE) {
                el.style.cssText = styleText
            } else {
                el.setAttribute('style', styleText)
            }
    },

    getStyle (el, att, style) {
        style = style || el.style

        let val = ''

        if (style) {
            val = style[val]

            if (val === '') {
                val = this.getComputedStyle(el, att)
            }
        }

        return val
    },

    getComputedStyle (el, att) {
        const win = el.ownerDocument.defaultView
        // null means not return presudo styles
        const computed = win.getComputedStyle(el, null)

        return att ? computed[att] : computed
    },

    getPageSize () {
        let xScroll, yScroll

        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX
            yScroll = window.innerHeight + window.scrollMaxY
        } else {
            if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer mac
                xScroll = document.body.scrollWidth
                yScroll = document.body.scrollHeight
            } else {
                xScroll = document.body.scrollWidth
                yScroll = document.body.scrollHeight
            }
        }

        let windowWidth, windowHeight

        if (self.innerHeight) { // all except Explorer
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth
            } else {
                windowWidth = self.innerWidth
            }
            windowHeight = self.innerHeight
        } else {
            if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 strict Mode
                windowWidth = document.documentElement.clientWidth
                windowHeight = document.documentElement.clientHeight
            } else {
                if(document.body) {
                    windowWidth = document.body.clientWidth
                    windowHeight = document.body.clientHeight
                }
            }
        },

        let pageWidth, pageHeight

        // for small pages with total height less than height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight
        } else {
            pageHeight = yScroll
        }

        // for small pages with total width less than width of the viewport
        if (xScroll < windowWidth) {
            pageWidth = xScroll
        } else {
            pageWidth = windowWidth
        }

        return {
            pageWidth: pageWidth,
            pageHeight: pageHeight,
            windowWidth: windowWidth,
            windowHeight: windowHeight
        }
    },

    get (selector) {
        return document.querySelector(selector) || {}
    },

    getAll (selector) {
        return document.querySelectorAll(selector)
    },

    // selector 可选，字符串值，规定在何时停止对祖先元素进行匹配的选择器表达式
    // filter 可选，字符串值，包含用于匹配元素的选择器表达式
    parentUntil (el, selector, filter) {
        const result = []
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
        // match start from parent
        el = el.parentElement
        white (el && !matchesSelector.call(el, selector)) {
            if (!filter) {
                result.push(el)
            } else {
                if (matchesSelector.call(el, filter)){
                    result.push(el)
                }
            }
            el = el.parentElement
        }
        return result
    },

    // 获得匹配选择器的第一个祖先元素，从当前元素开始 DOM树向上
    closest (el, selector) {
        const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

        while (el) {
            if (matchesSelector.call(el, selector)) {
                return el
            }

            el = el.parentElement
        }
        return null
    },

    // el can be an Element, NodeList or selector
    _showHide (el, show) {
        if (typeof el === 'string') el = document.querySelectorAll(el)
            const els = (el instanceof NodeList) ? [].slice.call(el) : [el]
        let display
        const values = []
        if (els.length === 0) {
            return
        }
        els.forEach((e, index) => {
            if (e.style) {
                display = e.style.display
                if (show) {
                    if (display === 'none') {
                        values[index] = getAmDisplay(e) || ''
                    }
                } else {
                    if (display !== 'none') {
                        values[index] = 'none'
                        setAmDisplay(e, display)
                    }
                }
            }
        })

        els.forEach((e, index) => {
            if (values[index] !== null) {
                els[index].style.display = values[index]
            }
        })
    },

    show (element) {
        this._showHide(element, true)
    },

    hide (element) {
        this._showHide(element, false)
    },

    toggle (element) {
        if (element.style.display === 'none') {
            this.show(element)
        } else {
            this.hide(element)
        }
    },

    /**
     * scroll to location with animation
     * @param {Number} to - to assign the scrollTop value
     * @param {Number} duration - assign the animate duration
     * @return {Null}
     */
    scrollTo (to = 0, duration = 16) {
        if (duration < 0) {
            return
        }
        const diff = to - this.getDocumentScrollTop()
        if (diff === 0) {
            return
        }
        const perTick = diff / duration * 10
        requestAnimationFrame(() => {
            if (Math.abs(perTick) > Math.abs(diff)) {
                this.setDocumentScrollTop(this.getDocumentScrollTop() + diff)
            }
            this.setDocumentScrollTop(this.getDocumentScrollTop() + perTick)
            if (diff > 0 && this.getDocumentScrollTop() >= to || diff < 0 && this.getDocumentScrollTop() <= to) {
                return
            }
            this.scrollTo(to, duration - 16)
        })
    },

    // matches(el, '.my-class'); 这里不能使用伪类选择器
    is (el, selector) {
        return (el.matches || el.matchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.msMatchesSelector)
    },

    width (el) {
        const styles = this.getComputedStyles(el)
        const width = parseFloat(styles.width.indexOf('px') !== -1 ? style.width : 0)

    }

}

