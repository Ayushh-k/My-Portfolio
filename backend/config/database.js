import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Error: ${error.message}`);
    console.warn('Server will continue running, but database features may be unavailable');
    console.warn('Make sure MongoDB is running on localhost:27017 or update MONGODB_URI in .env');
    // Don't exit, allow server to run anyway
  }
};

export default connectDB;
