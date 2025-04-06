import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Data from './customer.model.js';
import nodemailer from 'nodemailer';
import path from "path";

dotenv.config();

const __dirname = path.resolve();
console.log(__dirname);
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/growth-catalyst')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
});

// API Routes
const apiRouter = express.Router();

apiRouter.post('/leads', async (req, res) => {
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

apiRouter.get('/data', async (req, res) => {
  try {
    const allCustomers = await Data.find({});
    res.status(200).json(allCustomers);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

apiRouter.post('/send', async (req, res) => {
  try {
    const { recipient_email, fullName } = req.body;

    if (!recipient_email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: recipient_email' 
      });
    }

    // Email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipient_email,
      subject: 'Consultation Request Update',
      html: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background-color: #f0f8ff; color: #333; max-width: 600px; margin: auto; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
              <h2 style="color: #2c7be5;">Don&rsquo;t worry, I&rsquo;ve got you.</h2>
              <p>Hey <strong>${fullName}</strong>,</p>
              <p>It looks like we&rsquo;re not the right fit for each other just yet &ndash; and that&rsquo;s totally okay.</p>
              <p>Our systems work best for businesses that already have a solid foundation, and you&rsquo;re likely just a few steps away from that.</p>
              <p><strong>But here&rsquo;s the good news</strong> &ndash; I don&rsquo;t leave people hanging. You may not qualify for our consulting package <em>right now</em>, but that doesn&rsquo;t mean we can&rsquo;t grow together.</p>
              <p>Starting now, I&rsquo;m making it my mission to send you value-packed resources every other day &ndash; things that&rsquo;ll help you level up, get strategic clarity, and eventually <em>become the kind of business we can supercharge</em>.</p>
              <p>So stick around &ndash; this is just the beginning.</p>
              <p style="margin-top: 30px; font-style: italic; color: #555;">&ndash; Archisman<br>
                <span style="color: #888;">Your most loved consultant</span>
              </p>
            </div>
          `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: error.message
    });
  }
});

// Mount API routes
app.use('/api', apiRouter);

// Serve static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend', 'dist')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
