import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    default: 'Guest',
    trim: true,
  },
  text: {
    type: String,
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: [500, 'Comment cannot exceed 500 characters'],
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const interactionSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: [true, 'Project ID is required'],
    unique: true, // One interaction document per project
    index: true,
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
  comments: [commentSchema]
}, { timestamps: true });

export default mongoose.model('Interaction', interactionSchema);
