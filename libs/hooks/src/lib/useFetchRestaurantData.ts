import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance'; // Adjust the import path as needed
import { toast } from 'react-toastify';

// Define types for restaurant data
interface Restaurant {
  id: string;
  name: string;
  description?: string;
  image?: string;
  tagline?: string;
  cuisine?: string[];
  averageRating?: number;
  [key: string]: any; // Allow additional optional properties
}

export const useFetchRestaurantData = (restaurantId: string) => {
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch restaurant data from API
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Restaurant>(`/restaurants/${restaurantId}`);
        setRestaurantData(response.data);
      } catch (err) {
        const errorMessage = (err as Error)?.message || 'Error fetching restaurant data';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchRestaurantData();
    }
  }, [restaurantId]);

  return { restaurantData, loading, error };
};
