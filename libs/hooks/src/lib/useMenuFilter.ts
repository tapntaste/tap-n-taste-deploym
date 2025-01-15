import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Ensure correct path
import { toast } from 'react-toastify';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isChefSpecial?: boolean;
  isMostLiked?: boolean;
  isFeatured?: boolean;
  [key: string]: any; // Extendable for other fields
}

interface FetchMenuParams {
  restaurantId: string;
  category?: string;
  isChefSpecial?: boolean;
  isMostLiked?: boolean;
  isFeatured?: boolean;
}

export const useFetchFilteredMenuItems = ({
  restaurantId,
  category,
  isChefSpecial,
  isMostLiked,
  isFeatured,
}: FetchMenuParams) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const filters: { [key: string]: string | boolean } = {};

        if (category) filters.category = category;
        if (isChefSpecial !== undefined) filters.isChefSpecial = isChefSpecial;
        if (isMostLiked !== undefined) filters.isMostLiked = isMostLiked;
        if (isFeatured !== undefined) filters.isFeatured = isFeatured;

        const queryString = new URLSearchParams(filters as Record<string, string>).toString();
        
        const response = await axiosInstance.get<any>(
          `/restaurants/${restaurantId}/menu/filter?${queryString}`
        );

        setMenuItems(response?.data?.data || []);
      } catch (err) {
        const errorMessage = (err as Error)?.message || 'Failed to fetch menu items';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId, category, isChefSpecial, isMostLiked, isFeatured]);

  return { menuItems, loading, error };
};
