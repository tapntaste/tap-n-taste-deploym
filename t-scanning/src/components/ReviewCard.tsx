import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Rating,
  SvgIcon,
} from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { TButton } from '@tap-n-taste/ui';
import { useCreateReview, useFetchReviews } from '@tap-n-taste/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@tap-n-taste/utils';

type Review = {
  rating: number;
  review: string;
  user: { name: string };
  media?: Array<{ banner: string }>;
  createdAt: string;
};

type ReviewFormProps = {
  onSubmit: (data: { rating: number; review: string }) => void;
};

// Reusable ReviewCard Component
const ReviewCard: React.FC<{ review: Review ,restaurantData?: any}> = ({ review }) => {
  const reviewDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <Card className="!bg-[#FAFAFA] p-4 !rounded-lg !shadow-none">
      {/* Rating and Date */}
      <Box className="flex gap-5 items-center">
        <Box className="flex gap-1 items-center">
          <SvgIcon>
            <StarOutlinedIcon className="text-green-600 text-2xl" />
          </SvgIcon>
          <Typography variant="h6" className="text-green-600">
            {review.rating}
          </Typography>
        </Box>
        <Typography variant="caption" className="text-gray-500">
          Posted on {reviewDate}
        </Typography>
      </Box>

      {/* Main Content */}
      <CardContent className="flex justify-between">
        <Box>
          <Typography variant="body1" className="mb-2">
            {review.review}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            ~ {review.user.name}
          </Typography>
        </Box>

        {/* Display Media Images */}
        {review.media && review.media.length > 0 && (
          <Box className="flex items-center">
            {/* {review.media.slice(0, 2).map((mediaItem, index) => ( */}
              <CardMedia
                component="img"
                className="w-12 h-12 rounded object-cover ml-2"
                image={review.media[0].banner}
                // alt={`Review Image ${index + 1}`}
              />
            {/* ))} */}
            {review.media.length > 2 && (
              <Box className="ml-2 flex justify-center items-center bg-black opacity-50 rounded text-white w-12 h-12">
                +{review.media.length - 2}
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ReviewList Component
const ReviewList: React.FC = () => {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  const { reviews, loading, error } = useFetchReviews(restaurantData?._id);
  const [showAll, setShowAll] = useState(false);
  const maxReviewsToShow = 3;

  if (loading) return <Typography>Loading reviews...</Typography>;
  if (error) return <Typography>Error loading reviews</Typography>;

  const reviewsToDisplay = showAll ? reviews : reviews.slice(0, maxReviewsToShow);

  return (
    <Box className="flex flex-col gap-4">
      {reviewsToDisplay.map((review: any, index: any) => (
        <ReviewCard key={index} review={review} restaurantData={restaurantData} />
      ))}
      {reviews.length > maxReviewsToShow && (
        <Button
          variant="text"
          color="error"
          className="mt-4"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show less' : 'See all Reviews'}
        </Button>
      )}
    </Box>
  );
};

// ReviewForm Component
const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>('');

  const handleSubmit = () => {
    if (rating && review) {
      onSubmit({ rating, review });
      setRating(0);
      setReview('');
    }
  };

  return (
    <Box className="mt-8 flex flex-col gap-4">
      <Typography variant="h6">Add your rating and review!</Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        precision={0.5}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        sx={{ backgroundColor: '#f5f5f5' }}
      />
      <TButton
        fullWidth
        variant="contained"
        color="error"
        onClick={handleSubmit}
        text="Submit Review →"
        disabled={!rating || !review}
      />
    </Box>
  );
};

// Main ReviewPage Component
const ReviewPage: React.FC = () => {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  const restaurantId = restaurantData?._id;
  const { createReview } = useCreateReview(restaurantId);

  const handleReviewSubmit = async (data: { rating: number; review: string }) => {
    console.log('Review submitted:', data);
    const newReview = {
      rating: data?.rating,
      review: data?.review,
    };

    try {
      await createReview(newReview);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="mt-4">
      <Typography variant="h4" className="!mb-4 text-[#4D4D4D]">
        Reviews
      </Typography>
      <ReviewList />
      <ReviewForm onSubmit={handleReviewSubmit} />
    </Box>
  );
};

export default ReviewPage;
