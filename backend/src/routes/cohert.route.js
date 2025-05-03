import express from 'express';
import { saveLead, getAllLeads, sendEmail } from '../controller/cohert.controller.js';
import dotenv from 'dotenv';

dotenv.config();

const apiRouter = express.Router();

apiRouter.post('/leads', saveLead);

apiRouter.get('/data', getAllLeads);

apiRouter.post('/send', sendEmail);

export default apiRouter;