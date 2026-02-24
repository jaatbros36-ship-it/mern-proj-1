import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js';


const app = express();
const PORT = process.env.PORT || 3000;
const secretKEY = process.env.JWT_SECRET

// middleware to read JSON body
app.use(express.json());

// connect to mongoDB
connectDB();

// mount routes
app.use('/api/user', userRoutes);
app.use('/api/goal', goalRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});   