import express from 'express';
import {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';

const router = express.Router();

// Public routes
router.get('/', getAllCertificates);
router.get('/:id', getCertificateById);

// Private routes (would need auth middleware in production)
router.post('/', createCertificate);
router.put('/:id', updateCertificate);
router.delete('/:id', deleteCertificate);

export default router;
