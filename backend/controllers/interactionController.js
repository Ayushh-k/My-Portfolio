import Interaction from '../models/Interaction.js';
import connectDB from '../config/database.js';

// @desc    Get interactions for a project
// @route   GET /api/interactions/:projectId
// @access  Public
export const getInteractions = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    let interaction = await Interaction.findOne({ projectId });
    
    // If no interaction exists yet, return default empty state
    if (!interaction) {
      return res.status(200).json({ success: true, data: { likes: 0, comments: [] } });
    }

    res.status(200).json({ success: true, data: interaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Add a comment to a project
// @route   POST /api/interactions/:projectId/comment
// @access  Public
export const addComment = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const { text, user } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    let interaction = await Interaction.findOne({ projectId });

    if (!interaction) {
      interaction = new Interaction({ projectId, comments: [], likes: 0 });
    }

    const newComment = {
      text,
      user: user || 'Guest',
      date: new Date()
    };

    interaction.comments.push(newComment);
    await interaction.save();

    res.status(201).json({ success: true, data: interaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Toggle a like for a project
// @route   POST /api/interactions/:projectId/like
// @access  Public
export const toggleLike = async (req, res) => {
  try {
    await connectDB();
    const { projectId } = req.params;
    const { action } = req.body; // 'like' or 'unlike'

    let interaction = await Interaction.findOne({ projectId });

    if (!interaction) {
      interaction = new Interaction({ projectId, comments: [], likes: 0 });
    }

    if (action === 'unlike') {
      interaction.likes = Math.max(0, interaction.likes - 1);
    } else {
      interaction.likes += 1;
    }

    await interaction.save();

    res.status(200).json({ success: true, data: { likes: interaction.likes } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
