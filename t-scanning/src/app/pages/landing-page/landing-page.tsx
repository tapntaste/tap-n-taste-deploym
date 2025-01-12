/* eslint-disable @nx/enforce-module-boundaries */
import { Box } from '@mui/material';
import { Routes, Route, useParams } from 'react-router-dom';
import {
  TFaq,
  TFooter,
  TopNav,
  TSubmit,
  TOrderplaced,
  TNotificationPage,
  TCouponpage,
  LoginSignUp,
} from '@tap-n-taste/ui';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  CartPage,
  MenuPage,
  ProductAdd,
  OrderPage,
  ProfilePage,
  OrderComplete,
  OrderPrepare,
  PaymentScreen,
  PaymentSuccess,
  BookingConfirmation,
  OrderPlacedScreen,
  AboutPage,
  ContactPage,
  HomePage
} from '@tap-n-taste/scanning';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchRestaurantThunk, RootState } from '@tap-n-taste/utils';
import { useEffect } from 'react';
import {BACKEND_URL,SCANNING_FRONTEND_URL,ADMIN_FRONTEND_URL} from '@tap-n-taste/constant';
// @ Paths for routing as constants for easy maintenance and scalability
const PATHS = {
  HOME: '/',
  USER_HOME: '/user/:userId',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  MENU: '/menu',
  CART: '/user/:userId/cart',
  FAQ: '/faq',
  LOGIN_OTP: '/login/otp',
  ORDER_PLACED: '/login/orderplaced',
  NOTIFICATION: '/notification',
  COUPONS: '/coupons',
  PRODUCT_ADD: '/productadd',
  ORDER: '/user/:userId/order',
  ORDER_PREPARE: '/user/:userId/order-prepare',
  ORDER_COMPLETE: '/user/:userId/order-complete',
  PROFILE: '/user/:userId/profile',
  ORDER_FLOW: '/user/:userId/order-flow',
  OTP_SUBMIT: '/otp',
  PAYMENT_SCREEN: '/payment-screen',
  PAYMENT_SUCCESS: '/payment-success',
  BOOKING_CONFIRMATION: '/booking-confirmation',
  ORDER_PLACED_SCREEN: '/order-placed',
  ABOUT: '/about*',
  CONTACT: '/contact*',
};


console.log(BACKEND_URL,SCANNING_FRONTEND_URL,ADMIN_FRONTEND_URL);

/**
 * @component LandingPage
 * @description Handles route navigation and shared layout with Tailwind CSS and constants for paths.
 */
export const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const { restaurantData, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );
  const {restaurantId}=useParams()
  console.log(restaurantId);
  

  useEffect(() => {
    dispatch(fetchRestaurantThunk(restaurantId||'12345'));
  }, [dispatch]);

  console.log(restaurantData);
  

  return (
    <Box className="min-h-screen flex flex-col bg-white shadow-lg text-gray-800 position-relative">
      {/* @ Top Navigation */}
      <TopNav />

      {/* @ Main Content Area */}
      <main className="flex-grow p-4 md:p-8">
        <Routes>
          {/* @ Public Routes */}
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.USER_HOME} element={<HomePage />} />
          <Route path={PATHS.LOGIN} element={<LoginSignUp type="login" />} />
          <Route path={PATHS.SIGNUP} element={<LoginSignUp type="signup" />} />
          <Route path={PATHS.MENU} element={<MenuPage />} />
          <Route path={PATHS.CART} element={<CartPage />} />
          <Route path={PATHS.FAQ} element={<TFaq />} />
          <Route path={PATHS.LOGIN_OTP} element={<TSubmit />} />
          <Route
            path={PATHS.ORDER_PLACED}
            element={
              <TOrderplaced mainText="Order Successfully" subText="Placed!" />
            }
          />
          <Route path={PATHS.NOTIFICATION} element={<TNotificationPage />} />
          <Route path={PATHS.COUPONS} element={<TCouponpage />} />
          <Route path={PATHS.PRODUCT_ADD} element={<ProductAdd />} />
          <Route path={PATHS.ORDER} element={<OrderPage />} />
          <Route path={PATHS.ORDER_PREPARE} element={<OrderPrepare />} />
          <Route path={PATHS.ORDER_COMPLETE} element={<OrderComplete />} />
          <Route path={PATHS.PROFILE} element={<ProfilePage />} />
          <Route path={PATHS.ORDER_FLOW} element={<OrderComplete />} />
          <Route path={PATHS.OTP_SUBMIT} element={<TSubmit />} />

          {/* @ Tap N Taste Flow Routes */}
          <Route path={PATHS.PAYMENT_SCREEN} element={<PaymentScreen />} />
          <Route path={PATHS.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
          <Route
            path={PATHS.BOOKING_CONFIRMATION}
            element={<BookingConfirmation />}
          />
          <Route
            path={PATHS.ORDER_PLACED_SCREEN}
            element={<OrderPlacedScreen />}
          />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
        </Routes>
      </main>

      {/* @ Footer Section */}
      <TFooter />
    </Box>
  );
};

export default LandingPage;
