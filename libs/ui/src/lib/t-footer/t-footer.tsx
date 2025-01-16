import styled from 'styled-components';
import { IoHomeOutline, IoCartOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { TNavButton } from '@tap-n-taste/ui';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';

export function TFooter() {
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);
  
  const { restaurantData, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );
  const restaurantId=restaurantData?._id
  const userId=authState?.userData?.id;

  return (
    <Box className="fixed z-[10] sm:hidden min-w-full bg-white rounded-lg bottom-0 flex items-center justify-between p-4 px-[8%] sm:px-[15%]">
      <Button onClick={() => navigate(`/restaurant/${restaurantId}/`)}>
        <IoHomeOutline />
      </Button>
      <Button
        onClick={() =>
          navigate(`/restaurant/${restaurantId}/user/${userId}/order`)
        }
      >
        <TbTruckDelivery />
      </Button>
      <StyledTNavButton
        icon={<LocalDiningIcon sx={{ color: '#f1f1f1' }} />}
        onClick={() => {
          console.log('Navigating to coupons page');
          navigate(`/restaurant/${restaurantId}/coupons`);
        }}
        backgroundColor="red"
      />
      <Button
        onClick={() =>
          navigate(`/restaurant/${restaurantId}/user/${userId}/cart`)
        }
      >
        <IoCartOutline />
      </Button>
      <Button
        onClick={() =>
          navigate(`/restaurant/${restaurantId}/user/${userId}/profile`)
        }
      >
        <PermIdentityIcon />
      </Button>
    </Box>
  );
}

const StyledTNavButton = styled(TNavButton)`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: red;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: black;
    font-size: 22px;
    transition: color 0.3s ease;

    &:hover {
      color: red;
    }
  }
`;
