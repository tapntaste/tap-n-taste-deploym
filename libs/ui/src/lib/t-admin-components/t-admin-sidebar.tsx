import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { logoutUser } from 'libs/utils/src/store/authSlice';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import Logo from '../../assets/logo.png';
import { navLinksData } from 't-scanning/src/app/constants/LandingPageData';
import { ADMIN_FRONTEND_URL } from '@tap-n-taste/constant';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';


interface SidebarProps {
  handleDrawerToggle: () => void;
}
export const Sidebar: React.FC<SidebarProps> = ({ handleDrawerToggle }) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Access auth state
  const { isAuthenticated, userData } = useSelector((state: RootState) => state.auth);
console.log(userData);

  // Use useParams hook to get dynamic restaurant ID
  const { restaurantId } = useParams<{ restaurantId: string }>();

  // Toggle drawer state
  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Authentication-specific links
  const authLinks = isAuthenticated
    ? [
        {
          icon: NotificationsActiveOutlinedIcon,
          linkText: 'Notifications',
          path: `/user/${userData?.id}/notification`,
        },
        {
          icon: RestaurantMenuOutlinedIcon,
          linkText: 'Create Menu',
          path: `/create-menu`,
        },
        {
          icon: AccountCircle,
          linkText: 'Log Out',
          action: handleLogout,
        },
      ]
    : [
        {
          icon: AccountCircle,
          linkText: 'Login/SignUp',
          path: `/login`,
        },
      ];

  // Combine navigation links
  const combinedNavLinks = [...navLinksData, ...authLinks];

  const DrawerList = () => (
    <Box
      className="w-[250px] h-full py-6 relative"
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Box className="flex flex-col gap-4 cursor-pointer">
        {combinedNavLinks.map((navLink, index) => {
          // Generate the correct path for dynamic links
          const path =
            navLink.path === '/restaurant/:restaurantId'
              ? `/restaurant/`
              : `/restaurant/${userData?.user?.restaurantId}/admin/${userData?.user?._id}${navLink.path || ''}`;
              

          return navLink.linkText === 'Log Out' ? (
            <Box
              key={index}
              onClick={handleLogout}
              className="px-6 py-2 hover:bg-primary hover:text-white flex gap-2 items-center justify-start transition-all duration-300 cursor-pointer"
            >
              <navLink.icon sx={{ fontSize: '30px' }} />
              <Typography sx={{ fontWeight: 300, fontFamily: 'Poppins' }}>
                {navLink.linkText}
              </Typography>
            </Box>
          ) : (
            <NavLink key={index} to={path} end>
              <Box className="px-6 py-2 hover:bg-primary hover:text-white flex gap-2 items-center justify-start transition-all duration-300">
                <navLink.icon sx={{ fontSize: '30px' }} />
                <Typography sx={{ fontWeight: 300, fontFamily: 'Poppins' }}>
                  {navLink.linkText}
                </Typography>
              </Box>
            </NavLink>
          );
        })}
      </Box>

      <Box className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <img src={Logo} width={40} alt="Logo" />
        <Typography variant="body1" sx={{ fontSize: 12, marginLeft: 1 }}>
          Powered by Tap'nTaste
        </Typography>
      </Box>
    </Box>
  );

  return (
    <div className="">
      {/* Hamburger Menu Icon */}
      <MenuIcon
        onClick={toggleDrawer(true)}
        sx={{
          fontSize: 30,
          fontWeight: 900,
          cursor: 'pointer',
          transition: 'color 0.3s ease',
          '&:hover': { color: 'var(--primary)' },
        }}
        className="hover:text-primary"
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList />
      </Drawer>
    </div>
  );
}
