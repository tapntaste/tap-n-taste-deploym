import { Box, Snackbar, Alert, IconButton } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Logo from '../../assets/logo.png';
import { useState } from 'react';
import TSidebar from '../t-sidebar/t-sidebar';
import { navLinksData } from 't-scanning/src/app/constants/LandingPageData';
import { TButton } from '../t-button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const themeColor = '#F1414F'; // Define your color here

export function TopNav() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  const restaurantId = restaurantData?._id ||'6780da43d5eb2186d06373bb';
  const authState = useSelector((state: RootState) => state.auth);
  const handleNotificationClick = () => {
    navigate(`/restaurant/${restaurantId}/notification`);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <Box className="px-[8%] sm:px-[15%] sticky top-0 bg-tertiary bg-white z-20">
      <Box className="flex items-center justify-between py-5 sm:py-10 relative">
        {/* Sidebar for mobile and tablet screens */}
        <TSidebar />

        {/* Logo */}
        <Box className="flex items-center space-x-2 cursor-pointer">
          <img src={Logo} alt="Brand Logo" className="h-12" />
          <h1 className="text-xl font-bold font-primary">Tapn'Taste</h1>
        </Box>

        {/* Navigation Links */}
        <Box className="hidden lg:flex gap-2 xl:gap-8">
          {navLinksData.map((navLink) => (
            <NavLink
              key={navLink.linkText}
              to={navLink.path}
              end={navLink.end}
              className={({ isActive }) =>
                `font-semibold lg:text-sm uppercase flex items-center gap-2 cursor-pointer ${
                  isActive ? 'text-red-500' : 'hover:text-primary'
                }`
              }
            >
              {navLink.linkText}
            </NavLink>
          ))}
        </Box>

        {/* Sign In / Sign Up Buttons */}
        {!authState?.isAuthenticated && (
          <Box className="hidden md:flex gap-4 max-lg:gap-2">
            <TButton
              text="Sign Up"
              className={{ text: 'lg:text-xs' }}
              sx={{
                backgroundColor: 'white',
                border: '2px solid #F1414F',
                color: '#F1414F',
              }}
              onClick={() =>
                navigate(`/restaurant/${restaurantId}/sign-up`, {
                  state: restaurantData,
                })
              } // Navigate to sign-up
            />
            <TButton
              text="Sign In"
              className={{ text: 'lg:text-xs' }}
              sx={{
                backgroundColor: '#F1414F',
                border: '2px solid #F1414F',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#DC3D4A',
                },
              }}
              onClick={() =>
                navigate(`/restaurant/${restaurantId}/login`, {
                  state: restaurantData,
                })
              } // Navigate to login
            />
          </Box>
        )}

        {/* Notifications Icon (Visible on mobile and tablet only) */}
        <Box className="block lg:hidden">
       { authState?.isAuthenticated?<NotificationsNoneIcon
            className="text-black hover:text-[#F1414F] transition-colors duration-300 cursor-pointer"
            fontSize="large"
            onClick={handleNotificationClick}
          />:
          <IconButton onClick={() => navigate(`/restaurant/${restaurantId}/login`)}>

            <AccountCircleIcon className='w-10 h-10'/>
          </IconButton>}
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="info"
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              color: 'black',
              '& .MuiSvgIcon-root': {
                color: themeColor,
              },
              border: 2,
              borderColor: '#3333',
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}

export default TopNav;
