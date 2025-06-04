import express from 'express';
// import { jobRouter } from './routes/jobs';
// import { startJobWorker } from './workers/jobWorker';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/jobs');

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});