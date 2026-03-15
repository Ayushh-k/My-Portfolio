import mongoose from 'mongoose';

// Ensure we don't hold multiple connections open in the serverless environment
let isConnected = false; 

const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected.');
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    // Connect to database
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Error: ${error.message}`);
    console.warn('Server will continue running, but database features may be unavailable');
    console.warn('Make sure MongoDB is running on localhost:27017 or update MONGODB_URI in .env');
    // If we throw here, Vercel will crash the function. We want to fail gracefully.
  }
};

export default connectDB;
