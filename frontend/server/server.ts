import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Data from './customer.model.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/growth-catalyst')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.post('/api/leads', async (req, res) => {
  try {
    const { email, phoneNo, industry, companySize, monthlyRevenue, fullName, qualified } = req.body;
    
    const newCustomer = new Data({
      email,
      phoneNo,
      industry,
      companySize,
      monthlyRevenue,
      fullName,
      qualified: qualified || false,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
