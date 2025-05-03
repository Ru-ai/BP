import express from 'express';
import { saveLead, getAllLeads } from '../controller/perspect.controller.js';
import dotenv from 'dotenv';

dotenv.config();

const apiRouter = express.Router();

apiRouter.post('/lead', saveLead);

apiRouter.get('/data', getAllLeads);

export default apiRouter;