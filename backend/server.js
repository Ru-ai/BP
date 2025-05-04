import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { connectDB } from "./src/libs/db.js";
import cohertRouter from "./src/routes/cohert.route.js";
import perspectRouter from "./src/routes/perspect.route.js";

dotenv.config();

const __dirname = path.resolve();
console.log(__dirname);
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/cohert', cohertRouter);
app.use('/api/perspect', perspectRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../frontend', 'dist')));

  app.get('/*path', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
  
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
