/**
 *  TODO: file intro...
 *  ---------------------------------------------
 *  Author : IndexXuan(https://github.com/IndexXuan)
 *  Mail   : indexxuan@gmail.com
 *  Date   : Thu 09 Mar 2017 05:06:49 PM CST
 */

class Node {
  constructor (data, left, right) {
    this.data = data
    this.left = left
    this.right = right
    this.show = () => this.data
  }
}

class Tree {
  constructor (root) {
    this.root = root
  }

  add (data) {
    let n = new Node(data, null, null)
    if (this.root == null) {
      this.root = n
    } else {
      let current = this.root
      let parent
      while (true) {
        parent = current
        if (data < current.data) {
          if (current == null) {
            parent.left = n
            break
          }
        } else {
          current = current.left
          parent.right = n
          break
        }
      }
    }
  }
  
}
