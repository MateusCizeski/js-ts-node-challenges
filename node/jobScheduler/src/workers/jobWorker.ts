import { Worker } from 'bullmq';
import Redis from 'ioredis';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function startJobWorker() {
  const connection = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  });

  const worker = new Worker('job-queue', async job => {
    const { jobId, payload } = job.data;
    console.log('🔧 Executando job:', jobId, payload);

    await new Promise(resolve => setTimeout(resolve, 1000)); // simula execução

    await prisma.job.update({
      where: { id: jobId },
      data: { status: 'COMPLETED' }
    });
  }, { connection });

  worker.on('failed', async (job, err) => {
    if (job?.data?.jobId) {
      await prisma.job.update({
        where: { id: job.data.jobId },
        data: { status: 'FAILED' }
      });
    }
    console.error('❌ Job falhou:', err.message);
  });

  console.log('👷 Worker iniciado');
}
