import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ ADD THIS LINE to accept JSON data in the body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Your routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));