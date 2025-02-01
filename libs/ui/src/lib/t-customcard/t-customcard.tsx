// export default TCustomCard;
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa6';
import { TbSquareDot } from 'react-icons/tb'; // Import the TbSquareDot icon
import TCounter from '../t-counter/t-counter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import {
  addMenuItemToCartThunk,
  removeMenuItemFromCartThunk,
  updateCartItemQuantity,
} from 'libs/utils/src/store/cartSlice';
import { Button } from '@mui/material';
import { deleteMenuItemFromOrder } from 'libs/utils/src/store/orderSlice';

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  flex-wrap: wrap; /* Allow wrapping for smaller screens */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack elements vertically on small screens */
    align-items: flex-start; /* Align items to start */
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 80px; /* Make image smaller on small screens */
    height: 80px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-basis: 60%; /* Allow space for other elements */

  @media (max-width: 768px) {
    flex-basis: 100%; /* Take full width on small screens */
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #424242;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 18px; /* Make title smaller on small screens */
  }
`;

const Description = styled.div`
  font-size: 14px;
  color: #757575;

  @media (max-width: 768px) {
    font-size: 12px; /* Reduce description size on small screens */
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RatingIcon = styled(FaStar)`
  color: #4caf50;
`;

const RatingText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #4caf50;
`;

const PriceContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #424242;
  align-self: flex-start;
  margin-top: 8px;

  @media (max-width: 768px) {
    margin-top: 0;
    font-size: 16px; /* Make price smaller on small screens */
  }
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
  justify-content: space-between;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack ActionContainer elements vertically on small screens */
    align-items: flex-start; /* Align elements to start */
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-center;
  position: absolute;
  right: 0; /* Align to the right edge */

  @media (max-width: 768px) {
    position: static; /* Remove absolute positioning on small screens */
    width: 100%; /* Allow container to take full width */
    justify-content: flex-start; /* Align to the start */
  }
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #e53935;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 6px 12px; /* Reduce button size on small screens */
    font-size: 12px;
  }
`;

const StyledTCustomCard = styled.div`
  color: pink;
`;

export function TCustomCard({
  image,
  title,
  description,
  rating,
  price,
  veg,
  id,
  quantity,
  isAddButton = false, // Default to true (add button)
  isRemoveButton = false, // Default to false (remove button)
  isCancelButton=false,
  isMenuCard=false,
  isOrderCard=false,
  orderId,
  handleDeleteMenuItems
}: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [count, setCount] = useState(quantity || 1);

  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  const authState = useSelector((state: RootState) => state.auth);
  const {orders} = useSelector((state: RootState) => state.order);
  console.log(orders);
  const handleAddItem = () => {
    dispatch(
      addMenuItemToCartThunk({
        userId: authState?.userData?.id,
        menuItemId: id,
        restaurantId: restaurantData._id,
        quantity: count,
      })
    );
  };

  const handleDeleteMenuItem = async () => {
    handleDeleteMenuItems(orderId,id)
  };
  const handleRemoveItem = () => {
    dispatch(
      removeMenuItemFromCartThunk({
        userId: authState?.userData?.id,
        menuItemId: id,
        restaurantId: restaurantData._id,
      })
    );
  };

  const handleCountChange = (newCount: number) => {
    dispatch(updateCartItemQuantity({ menuItemId: id, quantity: newCount }));
  };

  return (
    <StyledTCustomCard>
      <CardContainer>
        <Image src={image} alt={title} />
        <InfoContainer>
          <Title>
            {title}
            <TbSquareDot
              style={{
                marginLeft: '8px',
                fontSize: '20px',
                color: veg ? 'green' : 'red', // Change icon color based on veg prop
              }}
            />
          </Title>
          <Description>{description}</Description>

          <ActionContainer>
            <RatingContainer>
              <RatingIcon />
              <RatingText>{rating}</RatingText>
            </RatingContainer>
            <RightContainer>
              <TCounter disabled={isOrderCard} count={isMenuCard?count:quantity} setCount={isMenuCard?setCount:handleCountChange} />
              {/* <Button onClick={handleAddItem}>ADD</Button> */}
              {!isOrderCard&&isAddButton && !isRemoveButton && (
                <Button onClick={handleAddItem}>ADD</Button>
              )}
              {!isOrderCard&& isRemoveButton && !isAddButton && (
                <Button onClick={handleRemoveItem}>REMOVE</Button>
              )}
              {isOrderCard&&<Button onClick={handleDeleteMenuItem}>Cancel</Button>}
            </RightContainer>
          </ActionContainer>
        </InfoContainer>
        <PriceContainer>₹{price}</PriceContainer>
      </CardContainer>
    </StyledTCustomCard>
  );
}
