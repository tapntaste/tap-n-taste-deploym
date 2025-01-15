import { Box, Typography } from '@mui/material';
import { TButton, TCard,TLoadingSpinner,TErrorComponent } from '@tap-n-taste/ui';
import { topLinkingData } from '../app/constants/LandingPageData';
import { useFetchFilteredMenuItems } from '@tap-n-taste/hooks';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

const TopCustomerLikes = () => {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  const { menuItems, loading, error } = useFetchFilteredMenuItems({
    restaurantId: restaurantData?._id,
    isMostLiked: true,
  });

  if (loading) return <TLoadingSpinner/>
  if (error) return <TErrorComponent/>
  return (
    <Box className="mt-10 mb-10 font-primary">
      <Box className="flex justify-between items-center">
        <Typography
          variant="h5"
          sx={{  fontWeight: 'bold' }}
        >
          Mostly Liked by Customers
        </Typography>
        <TButton
          text="View All"
          className={{ root: 'hover:bg-none', text: 'capitalize' }}
          sx={{ color: 'red' }}
        />
      </Box>
      <Box className="flex flex-row gap-12 overflow-x-auto no-scrollbar mt-3  h-[250px]">
        {menuItems.map((card, index) => (
          <Box className="flex flex-col items-center">
            <TCard
              key={index}
              imgURL={card?.banner}
              gradient={false}
              sx={{
                root: { width: '180px', height: '148px' }, // Pass styles directly to the root
              }}
            />
            <Typography variant="h6">{card?.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopCustomerLikes;
