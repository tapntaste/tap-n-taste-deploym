import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@tap-n-taste/utils';
import { toast } from 'react-toastify';

export const ProtectedRoute = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const {restaurantData} = useSelector((state: RootState) => state.restaurant);

  if (!authState.isAuthenticated) {
    toast.error('You need to be logged in to access this page.');
    if(restaurantData?._id){
      return <Navigate to={`/restaurant/${restaurantData?._id}/login`} />
    }
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
