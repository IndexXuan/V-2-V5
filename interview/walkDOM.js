/**
 *  walk the dom tree
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : pengrui@iwaimai.baidu.com
 *  Date   : Mon 27 Feb 2017 10:58:52 AM CST
 */

function walkDOM (node, func) {
    func(node)
    node = node.firstChild
    while (node) {
        walkDOM(node, func)
        node = node.nextSibling
    }
}

// test
walkDOM(document.body, function (node) {
    if (node.nodeType === 3) { // Is it a Text node?
        var text = node.data.trim();
        if (text.length > 0) { // Does it have non white-space text content?
            // process text
        }
    }
})

function walk (node, func) {
    func(node)
    node = node.firstChild
    while (node) {
        walk(node, func)
        node = node.nextSibling
    }
}
