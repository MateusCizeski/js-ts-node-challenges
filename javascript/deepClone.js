function deepClone(value) {
    if(value === null || typeof value !== 'object') return value;

    if(Array.isArray(value)) return value.map(item => deepClone(item));

    const cloned = {};

    for (const key in value) {
        if(value.hasOwnProperty(key)) {
            cloned[key] = deepClone(value[key]);
        }
    }

    return cloned;
}

const original = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4, { e: 5 }]
  }
};

const copy = deepClone(original);

console.log(copy);
console.log(copy === original);
console.log(copy.b === original.b);
console.log(copy.b.d[2] === original.b.d[2]);
