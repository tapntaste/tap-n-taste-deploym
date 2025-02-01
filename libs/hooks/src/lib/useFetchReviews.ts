import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance';  // Adjust the path as needed
import { toast } from 'react-toastify';
interface Review {
    _id?: string;
    user: string;
    restaurant: string;
    rating: number;
    review?: string;
    media?: string;
    [key: string]: any;
  }
  
  interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
// Fetch Reviews Hook
export const useFetchReviews = (restaurantId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<any>(
          `/restaurants/reviews/${restaurantId}/reviews`
        );
        setReviews(response.data);
      } catch (err) {
        const errorMessage = (err as Error)?.message || 'Error fetching reviews';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) fetchReviews();
  }, [restaurantId]);

  return { reviews, loading, error };
};

// Create Review Hook
export const useCreateReview = (restaurantId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const createReview = async (reviewData: Partial<Review>) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post<any>(
        `/restaurants/reviews/${restaurantId}`,
        reviewData
      );
      toast.success(response.data.message || 'Review created successfully');
      return response.data.data;
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error creating review';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { createReview, loading };
};

// Update Review Hook
export const useUpdateReview = (restaurantId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateReview = async (reviewId: string, updatedData: Partial<Review>) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put<ApiResponse<Review>>(
        `/restaurants/${restaurantId}/reviews/${reviewId}`,
        updatedData
      );
      toast.success(response.data.message || 'Review updated successfully');
      return response.data.data;
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error updating review';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateReview, loading };
};

// Delete Review Hook
export const useDeleteReview = (restaurantId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteReview = async (reviewId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `/restaurants/${restaurantId}/reviews/${reviewId}`
      );
      toast.success(response.data.message || 'Review deleted successfully');
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error deleting review';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { deleteReview, loading };
};
