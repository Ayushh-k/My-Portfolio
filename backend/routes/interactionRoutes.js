import express from 'express';
import {
  getInteractions,
  addComment,
  toggleLike
} from '../controllers/interactionController.js';

const router = express.Router();

router.get('/:projectId', getInteractions);
router.post('/:projectId/comment', addComment);
router.post('/:projectId/like', toggleLike);

export default router;
