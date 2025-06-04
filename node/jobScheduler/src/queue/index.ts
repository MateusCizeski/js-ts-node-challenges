import { Queue } from 'bullmq';
import { Job } from '@prisma/client';
import Redis from 'ioredis';

const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
});

export const jobQueue = new Queue('job-queue', { connection });

export async function enqueueJob(job: Job) {
  const delay = new Date(job.scheduledAt).getTime() - Date.now();
  await jobQueue.add('runJob', { jobId: job.id, payload: job.payload }, {
    delay: Math.max(delay, 0)
  });
}
