const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

// root — return root node of the tree
// add(data) — add node with data to the tree
// has(data) — returns true if node with the data exists in the tree and false otherwise
// find(data) — returns node with the data if node with the data exists in the tree and null otherwise
// remove(data) — removes node with the data from the tree if node with the data exists
// min — returns minimal value stored in the tree (or null if tree has no nodes)
// max — returns maximal value stored in the tree (or null if tree has no nodes)

class BinarySearchTree {
  constructor() {
    this.origin = null;
  }

  root() {
    return this.origin;
  }

  add(data) {
    var newNode = new Node(data);

    if (this.origin === null) {
      this.origin = newNode;
    } else {
      let current = this.origin;

      while (current) {
        if (data < current.data) {
          if (current.left === null) {
            current.left = newNode;
            return;
          }

          current = current.left;
        } else {
          if (current.right === null) {
            current.right = newNode;
            return;
          }

          current = current.right;
        }
      }
    }
  }

  has(data) {
    if (!this.origin) {
      return false;
    }

    let current = this.origin;
    let isFound = false;

    while (current && !isFound) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        isFound = true;
      }
    }

    return isFound;
  }

  find(data) {
    if (!this.origin) {
      return null;
    }

    let current = this.origin;
    let finding = null;

    while (current && !finding) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        finding = current;
      }
    }

    return finding;
  }

  remove(data) {
    this.origin = this.removeNode(this.origin, data);
  }

  removeNode(current, data) {
    if (current === null) {
      return current;
    }

    if (data === current.data) {
      if (current.left === null && current.right === null) {
        return null;
      } else if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        const findSmallest = (node) => {
          while (node.left !== null) {
            node = node.left;
          }
          return node;
        };

        let tempNode = findSmallest(current.right);
        current.data = tempNode.data;

        current.right = this.removeNode(current.right, tempNode.data);
        return current;
      }
    } else if (data < current.data) {
      current.left = this.removeNode(current.left, data);
      return current;
    } else {
      current.right = this.removeNode(current.right, data);
      return current;
    }
  }

  min() {
    if (!this.origin) {
      return null;
    }

    let current = this.origin;
    let min = current.data;

    while (current) {
      if (current.left) {
        current = current.left;
        min = current.data;
      } else {
        current = null;
      }
    }

    return min;
  }

  max() {
    if (!this.origin) {
      return null;
    }

    let current = this.origin;
    let max = current.data;

    while (current) {
      if (current.right) {
        current = current.right;
        max = current.data;
      } else {
        current = null;
      }
    }

    return max;
  }
}

module.exports = {
  BinarySearchTree,
};
