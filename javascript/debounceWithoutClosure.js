function debounceWithoutClosure(fn, delay, timerMap = new WeakMap()) {
    return function(...args) {
        if(timerMap.has(fn)) {
            clearTimeout(timerMap.get(fn));
        }

        const timeoutId = setTimeout(() => {
            fn.apply(this, args);
            timerMap.delete(fn);
        }, delay);

        timerMap.set(fn, timeoutId);
    };
}

const log = debounceWithoutClosure((msg) => console.log('Sem closure:', msg), 500);

log('teste 1');
log('teste 2');