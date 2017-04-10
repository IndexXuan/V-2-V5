/**
 *  walk a tree
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Thu 09 Mar 2017 04:25:15 PM CST
 */

var tree = {
  value: '1',
  left: {
    value: '2',
    left: {
      value: '3',
      left: null,
      right: {
        value: '4',
        left: null,
        right: null
      }
    },
    right: {
      value: '6',
      left: {
        value: '10',
        left: {
          value: '7',
          left: null,
          right: null
        },
        right: null
      }
    }
  }
}

function walk (tree, cb) {
  cb && cb(tree.value)
  if (tree.left) {
    walk(tree.left, cb)
  }
  if (tree.right) {
    walk(tree.right, cb)
  }
}

walk(tree, console.log.bind(console))
