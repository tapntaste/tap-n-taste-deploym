import express from 'express';
import connectDB from './config/database';
import restaurantRoutes from './routes/restaurant.routes';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';
import { handleFileUpload } from './middlewares/uploadMiddleware';
import passport from './utils/googleAuth';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new socketIo.Server(server);

const PORT = process.env.PORT || 4000;

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:4300'],
  credentials: true,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Middleware 
app.use(express.json());

// Database Connection
connectDB();

// Middleware to parse JSON and handle file upload
app.use(express.urlencoded({ extended: true }));
app.use(handleFileUpload);

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Error Handler
app.use(errorHandler);

// Health Route
app.get('/health', async (req, res) => {
  const healthReport = {
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
    database: 'Unknown',
    memoryUsage: process.memoryUsage(),
  };

  try {
    const isDatabaseConnected = await checkDatabaseConnection();
    healthReport.database = isDatabaseConnected ? 'Connected' : 'Disconnected';
  } catch (err) {
    healthReport.database = 'Error';
  }

  res.status(200).json(healthReport);
});

// Test Route
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'API Test Route is working!' });
});

// Root Route
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Tap-n-Taste API!' });
});

// Start Server
if (process.env.NODE_ENV !== 'vercel') {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Socket.IO Logic: Listen for connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Helper function to check database connection
async function checkDatabaseConnection() {
  const mongoose = require('mongoose');
  return mongoose.connection.readyState === 1;
}

// Export the app for Vercel
module.exports = app;