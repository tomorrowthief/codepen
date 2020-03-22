
class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    show(){
        console.log(this.data);
    }
};


class BST {
    constructor() {
        this.root = null
    }
    insert(value) {
        const n = new Node(value, null, null);
        if (this.root === null) {
            this.root = n;
            return;
        }
        let current = this.root;
        while(true){
            if (value < current.data) {
                if (current.left === null) {
                    current.left = n;
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = n;
                    break;
                }
                current = current.right;
            }
        }
    }
    // 递归 前序 DLR （根左右）
    preOrderRecursive(node = this.root){
        if (node) {
            node.show();
            node.left && this.preOrderRecursive(node.left);
            node.right && this.preOrderRecursive(node.right);
        }
    }
    // 递归 中序 LDR
    inOrderRecursive(node = this.root){
        if (node) {
            node.left && this.inOrderRecursive(node.left);
            node.show();
            node.right && this.inOrderRecursive(node.right);
        }
    }
    // 递归 后序 LRD
    postOrderRecursive(node = this.root){
        if (node) {
            node.left && this.postOrderRecursive(node.left);
            node.right && this.postOrderRecursive(node.right);
            node.show();
        }
    }
    // 前序 非递归
    preOrderUnRecur(node = this.root) {
        if(!node) {
            throw new Error('Empty Tree');
        }
        const stack = [];
        stack.push(node);
        while(stack.length) {
            node = stack.pop();
            node.show();
            node.right && stack.push(node.right);
            node.left && stack.push(node.left);
        }
    }
    // 中序 非递归
    inOrderUnRecur(node = this.root) {
        if(!node) {
            throw new Error('Empty Tree');
        }
        const stack = [];
        while(stack.length) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                node.show();
                node = node.right;
            }
        }
    }
    // 后序 非递归
    postOrderUnRecur(node = this.root) {
        if(!node) {
            throw new Error('Empty Tree');
        }
        const s1 = [];
        const s2 = [];
        s1.push(node)
        while(s1.length) {
            node = s1.pop();
            s2.push(node);
            if (node.left) {
                s1.push(node.left);
            }
            if (node.right) {
                s1.push(node.right);
            }
        }
        while(s2.length) { 
            s2.pop().show();
        }
    }
}

const bstTree = new BST();

bstTree.insert(12);
bstTree.insert(7);
bstTree.insert(18);
bstTree.insert(13);
bstTree.insert(12);
bstTree.insert(26);
bstTree.insert(2);

console.log(bstTree);

bstTree.postOrderUnRecur();