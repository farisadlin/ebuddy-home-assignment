import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from '../routes/userRoutes';
import { createServer } from 'http';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();
const DEFAULT_PORT = 9090;
const PORT = process.env.PORT ? parseInt(process.env.PORT) : DEFAULT_PORT;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date()
  });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Backend API',
    endpoints: {
      users: '/api/users',
      health: '/health'
    }
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Create HTTP server
const server = createServer(app);

// Function to start the server on an available port
const startServer = (port: number) => {
  server.once('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      // Close the server and try the next port
      server.close();
      startServer(port + 1);
    } else {
      console.error('Server error:', error);
    }
  });

  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Health check: http://localhost:${port}/health`);
    console.log(`API endpoint: http://localhost:${port}/api/users`);
  });
};

// Start the server
startServer(PORT);

export default app;
