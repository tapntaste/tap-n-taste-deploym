import { Box, Checkbox } from '@mui/material';
import { TButton } from '@tap-n-taste/ui';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tick from '../../../../assets/tick-circle.png';

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box className="w-full min-h-screen px-[8%] sm:px-[15%] pt-10 flex justify-center items-center flex-col">
      <img src={Tick} alt="Tick" />
      <h3 className="mb-6 rounded-lg text-primary font-semibold text-2xl sm:text-3xl px-4 py-2">
        Success!
      </h3>
      <h1 className="mb-6 rounded-lg text-primary text-center font-semibold text-xl sm:text-2xl px-4 py-2">
        Your Booking is Confirmed
      </h1>
      <p className="w-[80%] text-center mb-20 text-sm sm:text-base">
        We’ve have sent your booking details via email. You're all set for
        [Event Name] at [Restaurant Name]! Get ready for a fantastic time filled
        with great food and fun! 😄
      </p>
      <TButton
        text="Download Ticket"
        className={{ text: 'lg:text-xs' }}
        sx={{
          backgroundColor: '#F1414F',
          border: '2px solid #F1414F',
          color: 'white',
          '&:hover': {
            backgroundColor: '#DC3D4A',
          },
        }}
        onClick={() => navigate('/restaurant/:restaurantId')}
      />
    </Box>
  );
};

export default PaymentSuccess;
