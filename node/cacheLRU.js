class Node {
  constructor(key, value, expireAt) {
    this.key = key;
    this.value = value;
    this.expireAt = expireAt;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity, ttl) {
    this.capacity = capacity;
    this.ttl = ttl;
    this.map = new Map();
    this.head = null;
    this.tail = null;
  }

  _removeNode(node) {
    if(node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if(node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }

  _addToHead(node) {
    node.next = this.head;
    node.prev = null;

    if(this.head) this.head.prev = node;
    this.head = node;

    if(!this.tail) this.tail = node;
  }

  _isExpired(node) {
    return node.expireAt !== null && node.expireAt <= Date.now();
  }

  get(key) {
    if(!this.map.has(key)) return null;

    const node = this.map.get(key);

    if(this._isExpired(node)) {
      this._removeNode(node);
      this.map.delete(key);
      return null;
    }

    this._removeNode(node);
    this._addToHead(node);

    return node.value;
  }

  put(key, value) {
    if(this.map.has(key)) {
      const node = this.map.get(key);

      node.value = value;
      node.expireAt = this.ttl ? Date.now() + this.ttl : null;

      this._removeNode(node);
      this._addToHead(node);
    } else {
      if(this.map.size >= this.capacity) {
        this.map.delete(this.tail.key);
        this._removeNode(this.tail);
      }

      const expireAt = this.ttl ? Date.now() + this.ttl : null;
      const newNode = new Node(key, value, expireAt);

      this._addToHead(newNode);
      this.map.set(key, newNode);
    }
  }
}


const cache = new LRUCache(3, 5000);

cache.put('a', 1);
cache.put('b', 2);
cache.put('c', 3);

console.log(cache.get('a'));

cache.put('d', 4);

console.log(cache.get('b'));

setTimeout(() => {
  console.log(cache.get('a'));
}, 6000);