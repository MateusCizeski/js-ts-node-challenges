const { Worker } = require("worker_threads");

function runWorkerTask(n) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: n
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if(code !== 0) {
                reject(new Error(`Worker parado com código de saida ${code}`));
            }
        });
    });
}

async function main() {
    console.time('Total time');

    const tasks = [50000, 60000, 70000, 80000];

    const results = await Promise.all(tasks.map((n) => runWorkerTask(n)));

    results.forEach((res, index) => {
        console.log(`Resultado da tarefa ${index + 1}: ${res} números primos`);
    });

    console.timeEnd('Total time');
}

main();