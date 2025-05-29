const { parentPort, workerData } = require('worker_threads');

function heavyComputation(n) {
    let count = 0;

    for(let i = 2; i <= n; i++) {
        let prime = true;

        for(let j = 2; j * j < i; i++) {
            if(i % j === 0) {
                prime = false;
                break;
            }
        }

        if(prime) count++; 
    }

    return count;
}

const result = heavyComputation(workerData);
parentPort.postMessage(result);