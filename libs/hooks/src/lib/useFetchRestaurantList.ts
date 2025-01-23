import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Adjust the path accordingly
import { toast } from 'react-toastify';

interface Restaurant {
    _id: string;
    name: string;
    tagline: string;
    description: string;
    slug: string;
    averageRating: number;
    status: string;
    distance: number;
    contact: {
      phone: string;
      email: string;
    }[];
    offers: {
      title: string;
      description: string;
      discountPercentage: number;
    }[];
    faq: {
      question: string;
      answer: string;
    }[];
    media: {
      banner: string;
    };
    socialLinks: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      website?: string;
    };
  }
  

export const useFetchRestaurantList = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Restaurant[]>('/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        const errorMessage = (err as Error)?.message || 'Failed to fetch restaurants';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, loading, error };
};
