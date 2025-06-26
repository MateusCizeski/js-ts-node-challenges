// DFS - Profundidade
// Espacial: O(n)
// Temporal: O(n)

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function arrayToTree(arr) {
  if (!arr.length || arr[0] == null) return null;

  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;

  while (i < arr.length) {
    const current = queue.shift();

    if (arr[i] != null) {
      current.left = new TreeNode(arr[i]);
      queue.push(current.left);
    }
    i++;

    if (i < arr.length && arr[i] != null) {
      current.right = new TreeNode(arr[i]);
      queue.push(current.right);
    }
    i++;
  }

  return root;
}

var maxDepth = function (root) {
  if (root === null) return 0;

  function dfs(node, depth) {
    if (node === null) return depth;
    return Math.max(dfs(node.left, depth + 1), dfs(node.right, depth + 1));
  }

  return dfs(root, 0);
};

// BFS - Amplitude
// Espacial: O(n)
// Temporal: O(n)

var maxDepthBFS = function (root) {
  if (root === null) return 0;

  let queue = [root];
  let depth = 0;

  while (queue.length > 0) {
    let levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }

  return depth;
};

const input = [3, 9, 20, null, null, 15, 7];
const root = arrayToTree(input);

console.log("DFS Depth:", maxDepth(root));
console.log("BFS Depth:", maxDepthBFS(root));
