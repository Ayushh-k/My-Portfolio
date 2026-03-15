import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: [150, 'Short description cannot exceed 150 characters']
    },
    imageUrl: {
      type: String,
      default: 'https://via.placeholder.com/400x250'
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function(v) {
          return v.length > 0;
        },
        message: 'At least one technology is required'
      }
    },
    features: {
      type: [String],
      default: []
    },
    githubLink: {
      type: String,
      required: [true, 'GitHub link is required'],
      match: [/^https:\/\/github\.com\/.*/, 'Please provide a valid GitHub URL']
    },
    liveLink: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      enum: {
        values: ['fullstack', 'frontend', 'backend'],
        message: 'Category must be fullstack, frontend, or backend'
      },
      required: [true, 'Project category is required']
    },
    featured: {
      type: Boolean,
      default: false
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

export default mongoose.model('Project', projectSchema);
