import express from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
  getReviews
} from '../controllers/review.controller'
import { authenticate } from '../middlewares/auth.middleware'; // Middleware for authentication

const router = express.Router();

// Create a review
router.post('/:id', createReview);

// Update a review
router.put('/:reviewId', authenticate, updateReview);

// Delete a review
router.delete('/:reviewId', authenticate, deleteReview);

// Get reviews or specific review
router.get('/:id/reviews/:reviewId?', getReviews);

export default router;
