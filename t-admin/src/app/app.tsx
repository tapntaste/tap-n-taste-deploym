import React, { useEffect } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box, Button, Grid, Typography } from '@mui/material';
import { RestaurantAdminPage } from './pages'; // Assuming you have this component
import theme from '../theme';
import './app.css';
import '@fontsource/poppins'; // Defaults to weight 400
import { LoginSignUp, MenuCreationForm, RestaurantCreationForm } from '@tap-n-taste/ui';
import { ToastContainer } from 'react-toastify';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '@tap-n-taste/utils';
import UpdateRestaurantForm from 'libs/ui/src/lib/t-update-restaurant/t-update-restaurant';
import { fetchUser, setUser } from 'libs/utils/src/store/authSlice';


// Navigation Page Component
const NavigationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
const authState = useSelector((state: RootState) => state.auth);
const {restaurantData} = useSelector((state: RootState) => state.restaurant);
console.log(authState.userData,restaurantData);
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    dispatch(setUser(userData));
    
  } else {
    dispatch(fetchUser()); // Fetch user from the backend if not in localStorage
    
  }
}, []);


  const routes = [
    { path: '/admin/page', label: 'Home Page' },
    { path: '/restaurant/login', label: 'Restaurant Login' },
    { path: '/restaurant/create-restaurant', label: 'Create Restaurant' },
    { path: '/restaurant/update-restaurant/:id', label: 'Update Restaurant' },
    { path: '/restaurant/:restaurantId/sign-up', label: 'Restaurant Sign-Up' },
    { path: '/admin', label: 'Admin Page' },
    { path:   `/restaurant/${authState?.userData?.user?.restaurantId}/admin/${authState?.userData?.user?._id}`, label: 'Restaurant Admin Page' },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tap-n-Taste Navigation
      </Typography>
      <Grid container spacing={2}>
        {routes.map((route, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Button
              variant="contained"
              fullWidth
              component={Link}
              to={route.path.replace(':id', authState?.userData?.user?._id || '1').replace(':restaurantId', authState?.userData?.user?.restaurantId||'1').replace(':adminId', '1')}
            >
              {route.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={5000} />
        <CssBaseline /> {/* Ensures consistent baseline styles across browsers */}
        <Routes>
          {/* Navigation Page */}
          <Route path="/" element={<NavigationPage />} />
          {/* Default Route */}
          <Route path="/admin/page" element={<div>Tap-n-Taste Home Page</div>} />
          <Route
            path="/restaurant/login"
            element={<LoginSignUp isAdminSignUpLogin={true} type="login" />}
          />
          <Route
            path="/restaurant/create-restaurant"
            element={<RestaurantCreationForm />}
          />
          {/* <Route
            path="/restaurant/create-menu"
            element={<MenuCreationForm />}
          /> */}
          <Route
            path="/restaurant/update-restaurant/:id"
            element={<UpdateRestaurantForm />}
          />
          <Route
            path="/restaurant/:restaurantId/sign-up"
            element={<LoginSignUp isAdminSignUpLogin={true} type="signup" />}
          />
          {/* Admin Route */}
          <Route path="/admin" element={<Outlet />} />
          {/* Dynamic Restaurant Admin Page Route */}
          <Route
            path="/restaurant/:restaurantId/admin/:adminId*"
            element={<RestaurantAdminPage />}
          />
        </Routes>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
