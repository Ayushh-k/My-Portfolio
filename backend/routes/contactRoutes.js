import express from 'express';
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Public route
router.post('/', submitContact);

// Private routes (would need auth middleware in production)
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.put('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;
