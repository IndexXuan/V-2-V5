/*******************************************************
# File   : You-Dont-Need-jQuery.js
# Author : IndexXuan(https://github.com/IndexXuan)
# Mail   : indexxuan@gmail.com
# Date   : 2015年12月24日 星期四 22时54分18秒
 ******************************************************/

/**
 * Query / Find 
 */

$('selector');

document.querySelectorAll('selector');

// Sibling 
$el.siblings();

[].filter.call(el.parentNode.children, function(child) {
  return child !== el;
});

// Previous 
$el.prev();

el.previousElementSibling;

// Next
$el.next();

el.nextElementSibling;

// Closest
$el.closest();

// Native - only lastest, no ie
el.closest(selector);

// Native - ie10+
function closest(el, selector) {
  var matchesSelector = el.matches 
                     || el.webkitMatchesSelector 
                     || el.mozMatchesSelector 
                     || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }

  return null;
}

// parentsUntil
$el.parentsUntil(selector, filter);

function parentUntil(el, selector, filter) {
  var result = [];
  var matchesSelector = el.matches 
                     || el.webkitMatchesSelector 
                     || el.mozMatchesSelector 
                     || el.msMatchesSelector;
  el = el.parentElement;
  while (el && !matchesSelector.call(el, selector)) {
    if (!filter) {
      result.push(el);
    } else {
      if (matchesSelector.call(el, filter)) {
        result.push(el);
      }
    }
    el = el.parentElement;
  }

  return result;
}

/**
 * Input / Textarea
 */

// value
$('#input').val();

document.querySelector('#input').value;

// index radio
$(e.currentTarget).index('.radio');

[].indexOf.call(document.querySelectorAll('.radio'), e.currentTarget);

// iframe
$iframe.contents();

iframe.contentDocument;

/// attr
$el.attr('foo');

el.getAttribute('foo', 'bar');

// data
$el.data('foo');

el.getAttribute('data-foo');
// ie11+
el.dataset['foo']

/**
 * css & style
 */

$el.css('color');

var win = el.ownerDocument.defaultView;
win.getComputedStyle(el, null).color;

// set style
$el.css({color: '#ffffff'});

el.style.color = '#ffffff';

// add class
$el.addClass(className);

el.classList.add(className);

// remove class
$el.removeClass(className);

el.classList.remove(className);

// has class
$el.hasClass(className);

el.classList.contains(className);

// toggle class
$el.toggleClass(className);

el.classList.toggle(className);

/**
 * Width & Height
 */

// window height
$(window).height();

window.document.documentElement.clientHeight; // not include scrollbar
window.innerHeight;

// document height
$(document).height();

document.documentElement.scrollHeight;

// element height
$el.height();

function getHeight(el) {
  var style = this.getComputedStyles(el);
  var height = el.offsetHeight;
  var borderTopWidth = parseFloat(style.borderTopWidth);
  var borderBottomWidth = parseFloat(style.borderBottomWidth);
  var paddingTop = parseFloat(style.paddingTop);
  var paddingBottom = parseFloat(style.paddingBottom);
  
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
}

// 精确到整数 当盒模型设置为border-box的时候是height，为content-box为height + padding
el.clientHeight;
// 精确到小数，当盒模型设置为border-box的时候是height，为content-box为height + padding
el.getBoundingClientRect().height;

/**
 * Position & Offset
 */

// position
$el.position();

{ left: el.offsetLeft, top: el.offsetTop }

// offset
$el.offset();

function getOffset(el) {
  var box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

// scroll top
$(window).scrollTop();

(document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

/**
 * DOM Manipulation
 */

// remove
$el.remove();

el.parentNode.removeChild();

// text
$el.text();

el.textContent;

// set text
$el.text(string);

el.textContent = string;

// html
$el.html();

el.innerHTML;

// set html
$el.html(htmlstring);

el.innerHTML = htmlstring;

// append
$el.append("<div id='container'>hello</div>");

el.insertAdjacentHTML('afterbegin', "<div id='container'>hello</div>");

// prepend
$el.prepend(domstring);

el.insertAdjacentHTML("afterbegin", domstring);

// insertBefore
$newEl.insertBefore(querystring);

var target = document.querySelector(querystring);
target.parentNode.insertBefore(newEl, target);

// insertAfter
$newEl.insertAfter(querystring);

var target = document.querySelector(querystring);
target.parentNode.insertBefore(newEl, target.nextSibling);

// is
$el.is(selector);

el.matches(selector);

// clone, for deep clone, set true in param
$el.clone();

el.cloneNode();

/**
 * Ajax
 * use fetch instead of xhr
 * github/fetch on ie9+ or fetch-ie8 on ie8+, fetch-jsonp to make jsonp
 */

/**
 * Event
 */

// bind an event with on
$el.on(eventName, eventHandler);

el.addEventListener(eventName, eventHandler);

// unbind an evnet with off
$el.off(eventName, eventHandler);

el.removeEventListener(eventName, eventHandler);

// trigger
$(el).trigger('custom-event', { key: 'data1'});

if (window.CustomEvent) {
  var event = new CustomEvent('custom-event', { detail: { key: 'data1' } });
} else {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('custom-event', true, true, { key: 'data1' });
}
el.dispatchEvent(event);

/**
 * Utilities
 */

// isArray
$.isArray(arr);

Array.isArray(arr);

// trim
$.trim(string);

string.trim();

// object assign
$.extend({}, defaultOpts, opts);

Object.assign({}, defaultOpts, opts);

// contains
$.contains(el, child);

el !== child && el.contains(child);

