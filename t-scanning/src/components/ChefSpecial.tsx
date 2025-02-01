import { Box, Typography } from '@mui/material';
import { TButton, TCard } from '@tap-n-taste/ui';
import { useFetchFilteredMenuItems } from '@tap-n-taste/hooks';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

const ChefSpecial = () => {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  const { menuItems, loading, error } = useFetchFilteredMenuItems({
    restaurantId: restaurantData?._id,
    isChefSpecial: true,
  });

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box className="mt-10 mb-10 overflow-visible">
      <Box className="flex justify-between items-center">
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Chef's Special
        </Typography>
        <TButton
          text="View All"
          className={{ root: 'hover:bg-none', text: 'capitalize' }}
          sx={{ color: 'red' }}
        />
      </Box>

      <Box className="flex flex-row gap-12 overflow-x-auto no-scrollbar mt-3 pb-10">
        {menuItems?.map((card, index) => (
          <Box
            key={index}
            className="flex flex-col justify-start items-start gap-5 bg-white rounded-2xl shadow-xl p-4"
            sx={{
              minWidth: '300px',
              flexGrow: 1,
              maxHeight: 'auto',
              overflow: 'visible',
            }}
          >
            <TCard
              imgURL={card?.banner}
              gradient={false}
              sx={{ root: { width: '100%', maxHeight: '300px' } }}
            />
            <Typography variant="h6" sx={{ fontFamily: 'Poppins', pl: 2 }}>
              {card?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#616161', pl: 2 }}>
              {card?.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChefSpecial;
