import mongoose from 'mongoose';

// Global cache for serverless environments
let cachedConnection = null;

const connectDB = async () => {
  // If we have a cached connection, use it
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return cachedConnection;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    
    // Explicitly missing URI check
    if (!mongoURI) {
      console.error('CRITICAL: MONGODB_URI environment variable is missing!');
      throw new Error('MONGODB_URI environment variable is missing.');
    }

    console.log('Establishing new MongoDB connection...');
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false, // Disabling buffering forces it to throw the real error immediately instead of timing out
    });

    cachedConnection = conn.connection;
    console.log(`MongoDB connected successfully to cluster: ${conn.connection.host}`);
    return cachedConnection;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // We throw the error so the API endpoint fails immediately with the real reason
    throw error;
  }
};

export default connectDB;
