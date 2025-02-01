import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { TopNav } from '../t-top-nav';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

// Main container for the restaurant card
const RestaurantCard = styled.div`
  background-color: #f5f6f7;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #a9a9a9;
`;

// Restaurant name and rating
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CheckCircleIcon = styled(CheckCircleOutlineIcon)`
  color: #a9a9a9;
  font-size: 5px;
`;

const RestaurantName = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #a9a9a9;
`;

const Rating = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 2px 4px;
  border-radius: 40px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;

  & > svg {
    font-size: 14px;
    margin-right: 4px;
  }
`;

const Details = styled.div`
  font-size: 12px;
  line-height: 1.4;
`;

const Timing = styled.div`
  margin-top: 4px;
  font-size: 12px;
  font-weight: bold;
  color: #a9a9a9;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* Space between text and line */
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #a9a9a9;
  position: relative;

  &::after {
    content: '';
    display: block;
    flex-grow: 1;
    height: 1px;
    background-color: #e0e0e0;
    margin-left: 8px; /* Space between text and line */
  }
`;

const FacilityList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  font-size: 12px;
`;

const FacilityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Checkmark = styled.span`
  color: #4caf50;
  font-size: 16px;
`;

const SocialLinks = styled.div`
  margin-top: 8px;
`;

const IconsButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3efef;
  border-radius: 50%;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
  color: #424242;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  & > svg {
    font-size: 18px;
  }
`;

// Component
export function TAbout() {
  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  const [activeFeatures, setActiveFeatures] = useState<any[]>([]);
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
    <RestaurantCard>
      <Header>
        <RestaurantName>{restaurantData?.name}</RestaurantName>
        <Rating>
          <GradeIcon />
        {restaurantData?.averageRating}
        </Rating>
      </Header>
      <Details>
        {/* {cuisines} */}
        <br />
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
        <br />
        {restaurantData?.contact[0]?.phone}
        <br />
        <Timing>
          {/* Opens at {openingTime} | Closes at {closingTime} */}
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
        </Timing>
      </Details>
      <SectionHeader>Facilities</SectionHeader>
      <FacilityList>
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
      </FacilityList>
      <SectionHeader>Connect with us</SectionHeader>
      <IconsButtonContainer>
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <FacebookIcon />
        </IconButton>
        <IconButton>
          <XIcon />
        </IconButton>
      </IconsButtonContainer>
    </RestaurantCard>
  );
}

export default TAbout;
