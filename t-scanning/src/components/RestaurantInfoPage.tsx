import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Rating,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ImageSlider } from '@tap-n-taste/ui';
import { TButton } from '@tap-n-taste/ui';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DirectionsIcon from '@mui/icons-material/Directions';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AssistantDirectionOutlinedIcon from '@mui/icons-material/AssistantDirectionOutlined';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';
import { sliderImages } from '../app/constants/LandingPageData';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';
import { ErrorOutlineRounded } from '@mui/icons-material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useEffect, useState } from 'react';

interface RestaurantProps {
  restaurantName: string;
  restaurantDesc: string;
  restaurantAddress: string;
  isOpen: boolean;
  deliveryAndDinning: boolean;
  distance: number;
  ratings: number;
  restaurantData: any;
}

export const RestaurantInfoPage = ({
  restaurantName,
  restaurantDesc,
  restaurantAddress,
  isOpen,
  deliveryAndDinning,
  distance,
  ratings,
}: RestaurantProps) => {
  const navigate = useNavigate();
  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  // State for features
  const [activeFeatures, setActiveFeatures] = useState<any[]>([]);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const phone = restaurantData?.contact[0]?.phone;
  const location = restaurantData?.location;
  const openGoogleMaps = () => {
    const { lat, lng } = location.geoCoordinates;
    if (!lat || !lng) {
      console.error('latitude or longitude not found', lat, lng);
    } else {
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      window.open(mapsUrl, '_blank');
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${phone}`;
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phone);
    alert('Phone number copied to clipboard!');
  };
  useEffect(() => {
    const featureLabels: { [key: string]: string } = {
      isOrderOnline: 'Order Online Available',
      isReviewActivated: 'Reviews Activated',
      isBookTable: 'Table Booking Available',
      isEventBook: 'Event Booking Available',
      isArMenu: 'Augmented Reality Menu Available',
      isMenuAvailable: 'Menu Available',
      isDineInAvailable: 'Dine-In Available',
      isDeliveryAvailable: 'Delivery Available',
      isTakeawayAvailable: 'Takeaway Available',
      isPureVeg: 'Pure Vegetarian',
      isNonVeg: 'Non-Vegetarian Options Available',
    };

    const features = restaurantData?.features || {};

    // Filter for features that are true and map to the featureLabels
    const activeFeatures = Object.keys(features)
      .filter((key) => features[key] === true) // Only keep keys where the value is true
      .map((key) => featureLabels[key]); // Map the key to its label
    setActiveFeatures(activeFeatures); // Set the state with the active feature labels
  }, [restaurantData]);


  return (
    <Box className="z-10 font-primary">
      <ImageSlider
        className={{
          root: 'custom-root-class',
          image: 'custom-image-class',
          indicator: 'custom-indicator-class',
          activeIndicator: '',
          inactiveIndicator: '',
        }}
        styles={{}}
        id="custom-slider"
        aria-label="Custom Image Slider"
      />
      <Box className="section">
        <Box className="header flex flex-col sm:flex-row justify-between items-center">
          <Box className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-semibold">
              {restaurantData?.name}
            </h1>
            <p className="text-[#8E8E8E] text-sm md:text-base mb-5">
              {restaurantData?.description}
            </p>
            <Typography className="text-gray-500">
              {restaurantData?.slug}
            </Typography>
            <Typography className="!text-gray-500">
              {restaurantData?.categories?.join(' | ')}
            </Typography>
          </Box>
          <Box className="flex">
            {/* Google Maps Directions */}
            <Button
              onClick={openGoogleMaps}
              className="p-0"
              title="Get Directions"
            >
              <AssistantDirectionOutlinedIcon style={{ color: 'blue' }} />
            </Button>

            {/* Call or Copy Phone Number */}
            <Button
              onClick={isDesktop ? copyPhoneNumber : handleCall}
              className="p-0"
              title={isDesktop ? 'Copy Phone Number' : 'Call Now'}
            >
              <CallIcon />
            </Button>
          </Box>
        </Box>
        <Box className="sm:flex sm:justify-between mt-4">
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <LocationOnIcon color="action" sx={{ mr: 1 }} />
              <Typography>
                {[
                  restaurantData?.location?.street,
                  restaurantData?.location?.city,
                  restaurantData?.location?.state,
                  restaurantData?.location?.zipCode,
                  restaurantData?.location?.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <AccessTimeIcon color="action" sx={{ mr: 1 }} />
              <p>
                {restaurantData?.status === 'Open' ? (
                  <Chip
                    label="Open now"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                ) : (
                  <Chip
                    label="Closed now"
                    color="error"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                )}
                Closes at {restaurantData?.openHours?.closingTime} |{' '}
                {restaurantData?.openHours?.days[0] || 'N/A'} -{' '}
                {restaurantData?.openHours?.days[
                  restaurantData?.openHours?.days.length - 1
                ] || 'N/A'}
              </p>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <RestaurantIcon color="action" sx={{ mr: 1 }} />
              {activeFeatures.length > 0 ? (
                <List>
                  {activeFeatures.map((label, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={label} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography color="textSecondary">
                  No active features available.
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={2}>
              <DirectionsIcon color="action" sx={{ mr: 1 }} />
              <p>{distance} km away</p>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Rating
                value={restaurantData?.averageRating || 0}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2">
                {restaurantData?.averageRating?.toFixed(1) || 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Box className="mt-4 mb-8">
        <TButton
          text="Menu"
          className={{ root: '!bg-[#F1414F] !text-white w-full' }}
          icon={<RestaurantMenuIcon className="text-white" />}
          onClick={() => navigate(`/restaurant/${restaurantData?._id}/menu`)} // Navigate to Menu
        />
      </Box>
    </Box>
  );
};
