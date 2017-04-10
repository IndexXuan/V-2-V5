/**
 *  TODO: file intro...
 t*  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 09 Jan 2017 03:48:46 PM CST
 */

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
        throw new Error(`raf is not support`)
    }
}

function getAmId (obj) {
    return obj._amId || (obj._amId = _amId++)
}

function setAmDisplay (elem, display) {
    const id = getAmId(elem)
    _amDisplay[`_am_${id}`] = display
}

export default {
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

    removeClass (el, className) {
        if (typeof el === 'string') el = document.querySelectorAll(el)
        const els = (el instanceof NodeList) ? [].slice.call(el) : [el]
    
        els.forEach(e => {
            if (this.hasClass(e, className)) {
                if (e.classList) {
                    e.classList.remove(className)
                }
            } else {
                e.className = e.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), '')
            }
        })
    },

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

    insertAfter (newEl, targetEl) {
        const parent = targetEl.parentNode
        if (parent.lastChild === targetEl) {
            parent.appendChild(newEl)
        } else {
            parent.insertBefore(newEl, targetEl.nextSibling)
        }
    },

    remove (el) {
        if (typeof el === 'string') {
            [].forEach.call(document.querySelectorAll(el), node => {
                node.parentNode.removeChild(node)
            })
        } else if (el.parentNode) {
            el.parentNode.removeChild(el)
        } else if (el instanceof NodeList) {
            [].forEach.call(el, node => {
                node.parentNode.removeChild(node)
            })
        } else {
            throw new Error('you can only pass Elemetn, array of Element or query string as argument')
        }
    },
    
    forceReflow (el) {
        el.offsetHeight
    },

    getDocumentScrollTop () {
        return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    },

    setDocumentScrollTop (value) {
        window.scrollTo(value)
        return value
    },

    outerHeight (el) {
        return el.offsetHeight
    },

    outerHeightWithMargin (el) {
        let height = el.offsetHeight
        const style = window.getComn(el)
        height += (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0)
        return height
    },

    // outerWidth, outerWidthWithMargin

    getComputedStyle (el) {
        return el.ownerDocument.defaultView.getComputedStyle(el, null)
    },

    getOffset (el) {
        const html = el.ownerDocument.documentElement
        let box = { top: 0, left: 0 }

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

    setStyle (node, attr, val, style) {
        style = style || node.style
        if (style) {
            if (val === null || val === '') {
                val = ''
            } else if (!isNaN(Number(val)) && reUnit.test(attr)) {
                val += 'px'
            }
        }

        if (attr === '') {
            attr = 'cssText'
            val = ''
        }

        style[attr] = val
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
            if (item.indexOf(':') !== '-1') {
                const obj = item.split(':')
                originStyleObj[trim(obj[0])] = trim(obj[1])
            }
        })
    },

    getStyle (el, attr, style) {

    }


}


