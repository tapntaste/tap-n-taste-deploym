import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Link,
  Box,
} from '@mui/material';
import { TFooter, TopNav } from '@tap-n-taste/ui';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '@tap-n-taste/constant';

const primaryColor = '#F1414F'; // Custom Red
const secondaryColor = '#F1414F'; // Light Red
const textPrimaryColor = '#000000'; // Black text for readability
const textSecondaryColor = '#FFFFFF'; // White text for readability

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

export const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BACKEND_URL)
      .then((response) => setRestaurants(response.data))
      .catch((error) =>
        console.error('Error fetching restaurant data:', error)
      );
  }, []);

  return (
    <Box>
      <TopNav />
      <div className="p-8 bg-gray-50 min-h-screen">
        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom 
          className="font-bold"
        >
          Discover the best food & drinks in Your City
        </Typography>
        <Typography 
          variant="h6" 
          align="center" 
          gutterBottom 
        >
          Explore curated lists of top restaurants, cafes, pubs, and bars in Bhopal, based on trends
        </Typography>
        <Grid container spacing={4}>
          {restaurants?.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
              <Card 
                className="shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                sx={{ borderColor: primaryColor }}
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              >
                <CardMedia
                  component="img"
                  height="160"
                  className='object-cover object-center w-full h-full rounded-lg' 
                  image={restaurant?.media?.banner}
                  alt={restaurant.name}
                />
                <CardContent className='mt-4 flex flex-col gap-2'>
                  <Typography variant="h4" component="div" className="text-red-600 font-bold">
                    {restaurant.name}
                  </Typography>
                  <Typography className='text-gray-600' gutterBottom>
                    {restaurant?.slug}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    {restaurant.description}
                  </Typography>
                  <Typography className="mt-2 text-gray-600">
                    <strong>Status:</strong> {restaurant.status}
                  </Typography>
                  <Typography>
                    <strong>Rating:</strong> {restaurant.averageRating}/5
                  </Typography>
                  <Typography>
                    <strong>Distance:</strong> {restaurant.distance} km
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: primaryColor,
                      color: textSecondaryColor,
                      '&:hover': {
                        backgroundColor: secondaryColor,
                      },
                    }}
                    className="mt-4"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <TFooter />
    </Box>
  );
};
