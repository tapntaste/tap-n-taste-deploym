import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  TCategory,
  TCustomCard,
  TManage,
  TView,
  TSearchbar,
  TButton,
} from '@tap-n-taste/ui';
import CuisinesOffered from '../../../components/CuisinesOffered';
import BottomInfoPopUp from '../../../components/BottomInfoPopup';
import { useMenuItems } from '@tap-n-taste/hooks';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL, SCANNING_FRONTEND_URL } from '@tap-n-taste/constant';

export const MenuPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMenuItems, setFilteredMenuItems] = useState<any[]>([]);
  const [isVegActive, setVegActive] = useState<boolean>(false);
  const [isNonVegActive, setNonVegActive] = useState<boolean>(false);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const navigate = useNavigate();
  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  const { menuItems, loading, error } = useMenuItems(restaurantData?._id);
  const { cartItems } = useSelector(
    (state: RootState) => state.cart
  );
  // Extract unique cuisines from menu items
  const cuisines = [...new Set(menuItems?.map((item) => item.category))];
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (menuItems) {
      let filtered = menuItems;

      // Filter by cuisine
      if (selectedCuisine) {
        filtered = filtered.filter((item) => item.category === selectedCuisine);
      }

      // Filter by Veg/Non-Veg if toggles are active
      if (isVegActive && !isNonVegActive) {
        filtered = filtered.filter((item) => item.isVeg);
      }
      if (isNonVegActive && !isVegActive) {
        filtered = filtered.filter((item) => !item.isVeg);
      }

      // Apply search query filtering
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredMenuItems(filtered);
    }
  }, [searchQuery, menuItems, isVegActive, isNonVegActive, selectedCuisine]);

  // Highlight search terms in item names
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} style={{ fontWeight: 'bold', color: '#F1414F' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const itemAddHandler = (e: React.MouseEvent<HTMLButtonElement>, id: any) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!authState?.isAuthenticated) {
      // Redirect to login page if not logged in
      navigate(`/restaurant/${restaurantData?._id}/login`);
    } else {
      console.log('authenticated', authState);

      // Dispatch action to add item to cart
      // dispatch(addToCart({ itemId, title, price }));
    }
  };

  return (
    <Box className="px-[8%] sm:px-[15%]">
      {/* Search Bar for Menu Items */}
      <TSearchbar
        placeholder="Search Dishes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <TView />

      {/* Filter by Veg/Non-Veg */}
      <Box className="flex flex-col items-start justify-between md:flex-row md:items-center mb-8">
        <TManage />
        <TCategory
          isVegActive={isVegActive}
          setVegActive={setVegActive}
          isNonVegActive={isNonVegActive}
          setNonVegActive={setNonVegActive}
        />
      </Box>

      {/* Cuisine Selection */}
      <Box className="mt-4 mb-8">
        <Typography variant="h6">Select a Cuisine</Typography>
        <Box className="flex gap-4 mt-2 flex-wrap flex-col md:flex-row">
          {cuisines.map((cuisine, index) => (
            <TButton
              key={index}
              text={cuisine}
              className={{
                root: 'p-4 word-wrap text-sm text-break ',
                text: 'capitalize',
              }}
              onClick={() =>
                setSelectedCuisine(cuisine === selectedCuisine ? null : cuisine)
              }
              sx={{
                backgroundColor:
                  cuisine === selectedCuisine ? 'red' : '#EDEBEB',
                color: cuisine === selectedCuisine ? '#fff' : 'black',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Display Filtered Menu Items */}
      <Box className="mb-4">
        {!loading && filteredMenuItems.length > 0 ? (
          filteredMenuItems.map((item) =>
            item.isAvailable ? (
              <TCustomCard
                key={item._id}
                image={item?.banner}
                title={highlightText(item?.name, searchQuery)}
                description={item?.description}
                rating={item?.ratings?.averageRating}
                price={item?.price}
                veg={item?.isVeg}
                id={item?._id}
                isAddButton={true} // Show add button
                isRemoveButton={false} // Don't show remove button
                isMenuCard={true}
              />
            ) : null
          )
        ) : (
          <p>
            {loading
              ? 'Loading menu items...'
              : 'No matching menu items found.'}
          </p>
        )}
      </Box>

      <BottomInfoPopUp />
    </Box>
  );
};
