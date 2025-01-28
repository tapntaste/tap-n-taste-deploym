import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/landing-page/landing-page';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { TAbout } from '@tap-n-taste/ui';
import { ToastContainer } from 'react-toastify';
import theme from 't-admin/src/theme';
import AboutPage from './pages/about-page/about-page';
import ContactPage from "./pages/tapn'taste flow/contact-page/contact-page";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '@tap-n-taste/utils';
import { RestaurantList } from '@tap-n-taste/scanning';
import { useEffect } from 'react';
import { fetchUser, setUser } from 'libs/utils/src/store/authSlice';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, CircularProgress } from '@mui/material';

const App = () => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />{' '}
        {/* Ensures consistent baseline styles across browsers */}
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurant/:restaurantId/*" element={<LandingPage />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
