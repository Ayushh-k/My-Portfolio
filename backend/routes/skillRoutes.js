import express from 'express';
import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';

const router = express.Router();

// Public routes
router.get('/', getAllSkills);
router.get('/:id', getSkillById);

// Private routes (would need auth middleware in production)
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

export default router;
