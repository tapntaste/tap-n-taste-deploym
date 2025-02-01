import Review from '../models/review.model';
import Restaurant from '../models/restaurant.model';
import Media from '../models/media.model';


// Create a new review
export const createReview = async (req, res, next) => {
  const { id: restaurantId } = req.params;
  const userId = req?.user?.id;
  const { rating, review, media } = req.body;

  try {
    // Ensure the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    let mediaId = null;

    // Create and link media if provided
    if (req.files && req.files.length > 0) {
      try {
        const newMedia = new Media({
          restaurantId,
          banner:req.files[0].path,
          createdBy: userId,
        });

        await newMedia.save();
        mediaId = newMedia._id;
      } catch (mediaError) {
        return next(mediaError);
      }
    }

    // Create the review with media reference if applicable
    const newReview = new Review({
      user: userId,
      restaurant: restaurantId,
      rating,
      review,
      media: mediaId,
    });

    await newReview.save();
    res.status(200).json({ message: 'Review created successfully', data: newReview });

  } catch (error) {
    next(error);
  }
};


// Update an existing review by review ID
export const updateReview = async (req, res, next) => {
  const { restaurantId, reviewId } = req.params;
  const userId = req.user.id;

  try {
    // Ensure the review belongs to the user and restaurant
    const review = await Review.findOne({
      _id: reviewId,
      restaurant: restaurantId,
      user: userId,
    });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: 'Review updated successfully', data: updatedReview });
  } catch (error) {
    next(error);
  }
};

// Delete a review by review ID
export const deleteReview = async (req, res, next) => {
  const { id: restaurantId , reviewId } = req.params;
  const userId = req.user.id;

  try {
    // Ensure the review belongs to the user and restaurant
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      restaurant: restaurantId,
      user: userId,
    });
    if (!review) {
      return res
        .status(404)
        .json({ message: 'Review not found or already deleted' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all reviews for a restaurant or a specific review by review ID
export const getReviews = async (req, res, next) => {
  const { id: restaurantId, reviewId } = req.params;

  try {
    if (reviewId) {
      // Fetch a specific review by ID
      const review = await Review.findOne({
        _id: reviewId,
        restaurant: restaurantId,
      })
        .populate('user') // Populate user details (e.g., name)
        .populate('media'); // Populate media associated with the review
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      return res.status(200).json(review);
    }

    // Fetch all reviews for the restaurant
    const reviews = await Review.find({ restaurant: restaurantId })
      .populate('user', 'name') // Populate user details
      .populate('media'); // Populate media details

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
