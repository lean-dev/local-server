import express from 'express';
import { apiRouter } from './api';

const app = express();

// JSON API
app.use('/api', apiRouter);

export default app;
