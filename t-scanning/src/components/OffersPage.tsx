import { Box, Typography } from '@mui/material';
import { offersSectionData } from '../app/constants/LandingPageData';
import { TButton, TCard } from '@tap-n-taste/ui';
import '../app/style.css';
import { useSelector } from 'react-redux';
import { RootState } from '@tap-n-taste/utils';

const OfferPage = () => {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  return (
    <Box className="my-20">
      <Box className="flex justify-between items-center">
        <Typography
          variant="h5"
          sx={{  fontWeight: 'bold' }}
        >
          Offers of the day
        </Typography>
        <TButton
          text="View All"
          className={{ root: 'hover:bg-none', text: 'capitalize' }}
          sx={{ color: 'red' }}
        />
      </Box>
      <Box className="flex flex-row gap-12 overflow-x-auto no-scrollbar mt-3">
        {restaurantData?.offers?.map((card:any,index:any) => (
          <TCard
            key={index}
            imgURL={card?.banner}
            gradient={true}
            primeText={card?.title}
            // secText={card?.description}
          />
        ))}
      </Box>
    </Box>
  );
};

export default OfferPage;
