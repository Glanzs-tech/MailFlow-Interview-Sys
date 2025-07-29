import express from 'express';
import { getAllContacts, createContact } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', createContact);

export default router;
