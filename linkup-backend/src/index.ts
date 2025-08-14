import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/passport'; // Initialize passport configuration
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'LinkUp Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to LinkUp API - Professional Dating Through LinkedIn',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/auth',
      linkedin: '/auth/linkedin',
      profile: '/auth/me'
    }
  });
});

// Authentication routes
app.use('/auth', authRoutes);

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`,
    availableEndpoints: ['/health', '/api', '/auth/linkedin', '/auth/me']
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 LinkUp Backend server is running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 LinkedIn OAuth: http://localhost:${PORT}/auth/linkedin`);
  console.log(`👤 Profile endpoint: http://localhost:${PORT}/auth/me`);
});