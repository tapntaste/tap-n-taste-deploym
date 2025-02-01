import express from 'express';
import {
  createMedia,
  updateMedia,
  deleteMedia,
  getMedia
} from '../controllers/media.controller';
import { authenticate } from '../middlewares/auth.middleware'; // Assume middleware for authentication

const router = express.Router();

// Create media
router.post('/restaurants/:restaurantId/media', authenticate, createMedia);

// Update media
router.put('/restaurants/:restaurantId/media/:mediaId', authenticate, updateMedia);

// Delete media
router.delete('/restaurants/:restaurantId/media/:mediaId', authenticate, deleteMedia);

// Get media
router.get('/restaurants/:restaurantId/media/:mediaId?', authenticate, getMedia);

export default router;
