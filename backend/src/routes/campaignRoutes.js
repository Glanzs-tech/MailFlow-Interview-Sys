import express from 'express';
import {
  createCampaign,
  getUserCampaigns,
  deleteCampaign, 
} from '../controllers/campaignController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCampaign);
router.get('/', protect, getUserCampaigns);
router.delete('/:id', protect, deleteCampaign); 

export default router;
