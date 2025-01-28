import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import { toast } from 'react-toastify';
import { CircularProgress, Box } from '@mui/material';
import { fetchUser, setUser } from 'libs/utils/src/store/authSlice';

export const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userData, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { restaurantData ,loading:restaurantLoading} = useSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { user, timestamp } = JSON.parse(storedUser);
      const currentTime = new Date().getTime();
  
      if (currentTime - timestamp < 3 * 24 * 60 * 60 * 1000) {
        dispatch(setUser({ user, timestamp }));
      } else {
        localStorage.removeItem('user');
        dispatch(fetchUser());
      }
    } else {
      dispatch(fetchUser());
    }
  }, []);
  
  // Show a loading spinner while authentication status is being determined
  if (loading&&restaurantLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    toast.error('You need to be logged in to access this page.');
    console.log('not auth',restaurantData,userData);
    
    // return <Navigate to={`/restaurant/${restaurantData?._id}/login`} />;
  }
  // console.log(' auth',restaurantData,userData);
  
  

  // Render the protected route's content
  // console.log(Outlet);
  // console.log(restaurantData,userData,isAuthenticated);
  
  
  return <Outlet />;
};

export default ProtectedRoute;
