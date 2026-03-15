import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: {
        values: ['Programming Languages', 'Frontend', 'Backend', 'Databases', 'Tools', 'Version Control'],
        message: 'Please select a valid category'
      }
    },
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
      maxlength: [50, 'Skill name cannot exceed 50 characters']
    },
    proficiency: {
      type: String,
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        message: 'Proficiency must be Beginner, Intermediate, Advanced, or Expert'
      },
      default: 'Intermediate'
    },
    icon: {
      type: String,
      default: '' // Font Awesome icon class
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

export default mongoose.model('Skill', skillSchema);
