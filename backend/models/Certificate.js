import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Certificate title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
      maxlength: [100, 'Issuer cannot exceed 100 characters']
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [2000, 'Year must be valid']
    },
    certificateUrl: {
      type: String,
      required: [true, 'Certificate URL is required'],
      match: [/^https?:\/\/.*/, 'Please provide a valid URL']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters']
    },
    icon: {
      type: String,
      default: 'fas fa-certificate'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Certificate', certificateSchema);
