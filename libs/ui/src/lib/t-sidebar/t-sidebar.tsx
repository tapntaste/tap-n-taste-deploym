import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { navLinksData } from 't-scanning/src/app/constants/LandingPageData';
import { Typography } from '@mui/material';
import Logo from '../../assets/logo.png';
import { NavLink, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle } from '@mui/icons-material';
import { logoutUser } from 'libs/utils/src/store/authSlice';

export default function TSidebar() {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Use useParams hook to get the dynamic restaurant ID
  const { restaurantId } = useParams();

  const authLink = isAuthenticated
    ? {
        icon: AccountCircle,
        linkText: 'Log Out',
        path: '/logout',
        end: true,
      }
    : {
        icon: AccountCircle,
        linkText: 'Login/SignUp',
        path: '/login',
        end: true,
      };

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const combinedNavLinks = [...navLinksData, authLink];
  const DrawerList = () => {
    return (
      <Box
        className="w-[250px] h-full py-6 relative md:flex lg:hidden"
        role="presentation"
        onClick={toggleDrawer(false)}
      >
        <Box className="flex flex-col gap-4 cursor-pointer">
          {combinedNavLinks.map((navLink: any, index: number) => {
            // Generate the correct path for dynamic links
            const path =
              navLink.path === '/restaurant/:restaurantId'
                ? `/restaurant/${restaurantId}/homepage`
                : `/restaurant/${restaurantId}${navLink.path}`;

            return navLink.linkText === 'Log Out' ? (
              <Box
                key={navLink.linkText}
                onClick={handleLogout}
                className="px-6 py-2 hover:bg-primary hover:text-white flex gap-2 items-center justify-start transition-all duration-300 cursor-pointer"
              >
                <navLink.icon
                  sx={{
                    fontSize: '30px',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: 'var(--primary)',
                    },
                  }}
                  className="hover:text-white hover:bg-primary"
                />
                <Typography sx={{ fontWeight: 300, fontFamily: 'Poppins' }}>
                  {navLink.linkText}
                </Typography>
              </Box>
            ) : (
              <NavLink key={navLink.linkText} to={path} end={navLink.end}>
                <Box className="px-6 py-2 hover:bg-primary hover:text-white flex gap-2 items-center justify-start transition-all duration-300">
                  <navLink.icon
                    sx={{
                      fontSize: '30px',
                      '&:hover': {
                        color: 'white',
                        backgroundColor: 'var(--primary)',
                      },
                    }}
                    className="hover:text-white hover:bg-primary"
                  />
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
  };
  // const DrawerList = (
  //   <Box
  //     className="w-[250px] h-full py-6 relative md:flex lg:hidden"
  //     role="presentation"
  //     onClick={toggleDrawer(false)}
  //   >
  //     <Box className="flex flex-col gap-4 cursor-pointer">
  //       {combinedNavLinks.map((navLink, index) => {
  //         // Check if the navLink is for the home page, and append `/homepage`
  //         const path =
  //           navLink.path === '/restaurant/:restaurantId'
  //             ? `/restaurant/${restaurantId}/homepage`
  //             : `/restaurant/${restaurantId}${navLink.path}`;

  //         return (
  //           <NavLink key={navLink.linkText} to={path} end={navLink.end}>
  //             <Box className="px-6 py-2 hover:bg-primary hover:text-white flex gap-2 items-center justify-start transition-all duration-300">
  //               <navLink.icon
  //                 sx={{
  //                   fontSize: '30px',
  //                   '&:hover': {
  //                     color: 'white',
  //                     backgroundColor: 'var(--primary)',
  //                   },
  //                 }}
  //                 className="hover:text-white hover:bg-primary"
  //               />
  //               <Typography sx={{ fontWeight: 300, fontFamily: 'Poppins' }}>
  //                 {navLink.linkText}
  //               </Typography>
  //             </Box>
  //           </NavLink>
  //         );
  //       })}
  //     </Box>

  //     <Box className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
  //       <img src={Logo} width={40} alt="Logo" />
  //       <Typography variant="body1" sx={{ fontSize: 12, marginLeft: 1 }}>
  //         Powered by Tap'nTaste
  //       </Typography>
  //     </Box>
  //   </Box>
  // );

  return (
    <div className="lg:hidden">
      {/* Hamburger Menu Icon */}
      <MenuIcon
        onClick={toggleDrawer(true)}
        sx={{
          fontSize: 30,
          fontWeight: 900,
          cursor: 'pointer',
          transition: 'color 0.3s ease',
          '&:hover': { color: 'var(--primary)' }, // Using the Tailwind variable here
        }}
        className="hover:text-primary" // Tailwind hover for icon
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList />
      </Drawer>
    </div>
  );
}
