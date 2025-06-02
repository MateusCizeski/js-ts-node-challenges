function allSettled(promises) {
    return Promise.all(
        promises.map(p => 
            Promise.resolve(p)
            .then(value => ({
                status: 'fulfilled',
                value
            }))
            .catch(reason => ({
                status: 'rejected',
                reason
            }))
        )
    );
}

const p1 = Promise.resolve(10);
const p2 = Promise.reject('erro');
const p3 = new Promise(resolve => setTimeout(() => resolve(42), 100));

allSettled([p1, p2, p3]).then(results => {
    console.log(results);
});

