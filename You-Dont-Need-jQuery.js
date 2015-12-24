/*******************************************************
# File   : You-Dont-Need-jQuery.js
# Author : IndexXuan(https://github.com/IndexXuan)
# Mail   : indexxuan@gmail.com
# Date   : 2015年12月24日 星期四 22时54分18秒
 ******************************************************/

/// Query
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

/// Input / Textarea
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

/// css & style
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

