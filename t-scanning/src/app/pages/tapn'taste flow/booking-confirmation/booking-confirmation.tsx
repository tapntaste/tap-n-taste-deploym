import { Box, Checkbox } from '@mui/material';
import cardImage from '../../../../assets/master-card.png';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { TBarButton, TButton, TFooter } from '@tap-n-taste/ui';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    const restaurantId = 'your-restaurant-id'; // Replace with actual restaurantId
    navigate(`/restaurant/${restaurantId}/notification`);
  };
  return (
    <Box className="w-full min-h-screen px-[8%] sm:px-[15%] pt-10">
      <Box className="flex items-center justify-between">
        <KeyboardArrowLeftOutlinedIcon />
        <NotificationsNoneIcon
          className="text-black hover:text-[#F1414F] transition-colors duration-300 cursor-pointer"
          fontSize="large"
          onClick={handleNotificationClick}
        />
      </Box>
      <h1 className="text-2xl mt-8">
        Hi!, Name. <span className="text-primary">Booking Confirmed!</span>
      </h1>
      <h1 className="text-xl mt-8">Booking Details</h1>
      <Box className="mt-10 mb-64">
        <p>
          <span className="text-zinc-400">Date -</span> Friday, December 20th,
          2024
        </p>
        <p>
          <span className="text-zinc-400">Time -</span> 7:30 PM
        </p>
        <p>
          <span className="text-zinc-400">Party Size -</span> 4 people
        </p>
        <p>
          <span className="text-zinc-400">At -</span> Stone Water Restaurant
        </p>
        <p>
          <span className="text-zinc-400">Address -</span> Stone Water
          Restaurant
        </p>
        <p>
          <span className="text-zinc-400">Special request -</span> provide 1
          baby chair
        </p>
      </Box>
      <Box>
        <p>
          For any changes,call us at:{' '}
          <span className="text-primary">(123) 456-7890</span>
        </p>
        <p>
          Email us at:{' '}
          <span className="text-primary">support@gourmetbistro.com</span>
        </p>
      </Box>
      <TFooter />
    </Box>
  );
};

export default BookingConfirmation;
