import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { enqueueJob } from '../queue';

const prisma = new PrismaClient();
export const jobRouter = Router();

jobRouter.post('/', async (req, res) => {
  const { name, payload, scheduledAt } = req.body;

  try {
    const job = await prisma.job.create({
      data: {
        name,
        payload,
        scheduledAt: new Date(scheduledAt)
      }
    });

    await enqueueJob(job);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao agendar job.' });
  }
});

jobRouter.get('/', async (req, res) => {
  const jobs = await prisma.job.findMany({ orderBy: { scheduledAt: 'asc' } });
  res.json(jobs);
});
