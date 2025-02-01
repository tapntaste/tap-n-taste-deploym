import { useEffect, useState } from 'react';
import axiosInstance from './axiosInstance'; // Adjust path as needed
import { toast } from 'react-toastify';

// Define types for menu items and API responses
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isChefSpecial?: boolean;
  isMostLiked?: boolean;
  isFeatured?: boolean;
  restaurant: string;
  [key: string]: any; // Allow additional optional properties
}

interface FetchMenuOptions {
  category?: string;
  isChefSpecial?: boolean;
  isMostLiked?: boolean;
  isFeatured?: boolean;
}

export const useMenuItems = (restaurantId: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch menu items
  const fetchMenuItems = async (options: FetchMenuOptions = {}) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams(options as Record<string, string>).toString();
      const response = await axiosInstance.get(`/restaurants/${restaurantId}/menu?${queryParams}`);
      setMenuItems(response.data.data || []);
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error fetching menu items';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create a new menu item
  const createMenuItem = async (menuItemData: Omit<MenuItem, 'id' | 'restaurant'>) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`/restaurants/${restaurantId}/menu`, menuItemData);
      setMenuItems((prevItems) => [...prevItems, response.data.data]);
      toast.success('Menu item created successfully');
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error creating menu item';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing menu item
  const updateMenuItem = async (menuId: string, updatedData: Partial<MenuItem>) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/restaurants/${restaurantId}/menu/${menuId}`, updatedData);
      setMenuItems((prevItems) =>
        prevItems.map((item) => (item.id === menuId ? response.data.data : item))
      );
      toast.success('Menu item updated successfully');
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error updating menu item';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Delete a menu item
  const deleteMenuItem = async (menuId: string) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/restaurants/${restaurantId}/menu/${menuId}`);
      setMenuItems((prevItems) => prevItems.filter((item) => item.id !== menuId));
      toast.success('Menu item deleted successfully');
    } catch (err) {
      const errorMessage = (err as Error)?.message || 'Error deleting menu item';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  return {
    menuItems,
    loading,
    error,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};
