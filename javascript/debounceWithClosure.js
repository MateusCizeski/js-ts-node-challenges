function debounceWithClosure(fn, delay) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

const log = debounceWithClosure((msg) => console.log(`Closure:`, msg), 500);

log('teste 1');
log('teste 2');