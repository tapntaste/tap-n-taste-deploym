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
  ProtectedRoute,
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
  HomePage,
} from '@tap-n-taste/scanning';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  fetchRestaurantThunk,
  RootState,
} from '@tap-n-taste/utils';
import { useEffect } from 'react';
import {
  BACKEND_URL,
  SCANNING_FRONTEND_URL,
  ADMIN_FRONTEND_URL,
} from '@tap-n-taste/constant';
import { fetchUser } from 'libs/utils/src/store/authSlice';

import OrderFlow from '../order-flow/order-flow';

//import OrderChoices from '../order-choice/order-choice';
//import OrderChoice1 from '../order-choice/orderchoice1';
import PopUp from '../sign-up-popup/sign-up-popup';
import AddEvent from '../add-event/add-event'

import OrderChoice from '../order-choice/order-choice';
import OrderChoices from '../order-choice/order-choices';
import Settings from '../settings-admin-screen/settings';
import General from '../settings-admin-screen/general';
import EditProfile from '../settings-admin-screen/edit-profile';
import ResDetails from '../settings-admin-screen/res-details';
import AdminPageOrderChoice from '../admin-order-choice/admin-order-choice';
import AdminPageAddChoice from '../admin-add-choice/admin-add-choice';
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
  ORDER_PLACED: '/orderplaced',
  NOTIFICATION: '/user/:userId/notification',
  COUPONS: '/coupons',
  PRODUCT_ADD: '/productadd',
  ORDER: '/user/:userId/order',
  ORDER_PREPARE: '/user/:userId/order-prepare',
  ORDER_COMPLETE: '/user/:userId/order-complete',
  PROFILE: '/user/:userId/profile',
  OTP_SUBMIT: '/otp',
  PAYMENT_SCREEN: '/user/:userId/payment-screen',
  PAYMENT_SUCCESS: '/user/:userId/payment-success',
  BOOKING_CONFIRMATION: '/user/:userId/booking-confirmation',
  ORDER_PLACED_SCREEN: '/user/:userId/order-placed',
  ABOUT: '/about*',
  CONTACT: '/contact*',
  ORDER_CHOICE: '/user/:userId/order-choice',
  ORDER_CHOICES: '/user/:userId/order-choices',
};

console.log(BACKEND_URL, SCANNING_FRONTEND_URL, ADMIN_FRONTEND_URL);

/**
 * @component LandingPage
 * @description Handles route navigation and shared layout with Tailwind CSS and constants for paths.
 */

export const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  console.log('fasd', authState);

  const { restaurantData, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );
  const { restaurantId } = useParams();
  console.log(restaurantId);

  useEffect(() => {
    dispatch(fetchRestaurantThunk(restaurantId || '12345'));
  }, [dispatch]);

  console.log(restaurantData);

  const { userData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  console.log(userData);

  return (

    <Box>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:userId" element={<HomePage />} />
        <Route path="login" element={<LoginSignUp type="login" />} />
        <Route path="sign-up" element={<LoginSignUp type="signup" />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="user/:userId/cart" element={<CartPage />} />
        <Route path="faq" element={<TFaq />} />
        <Route path="login/otp" element={<TSubmit />} />
        <Route
          path="login/orderplaced"
          element={
            <TOrderplaced mainText="Order Successfully" subText="Placed!" />
          }
        />
        <Route path="notification" element={<TNotificationPage />} />
        <Route path="coupons" element={<TCouponpage />} />
        <Route path="productadd" element={<ProductAdd />} />
        <Route path="user/:userId/order" element={<OrderPage />} />
        <Route path="user/:userId/order-prepare" element={<OrderPrepare />} />
        <Route path="user/:userId/order-complete" element={<OrderComplete />} />
        <Route path="user/:userId/profile" element={<ProfilePage />} />
        <Route path="user/:userId/order-flow" element={<OrderFlow />} />
        <Route path="order-choice" element={<OrderChoices />} />
        <Route path="sign-up-popup" element={<PopUp />} />
        <Route path="add-event" element={<AddEvent />} />

        <Route path="admin-order-choice" element={<AdminPageOrderChoice />} />
        <Route path="admin-add-choice" element={<AdminPageAddChoice />} />

        <Route path="settings" element={<Settings />} />
        <Route path="general" element={<General />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="res-details" element={<ResDetails />} />
        <Route path="order-choices-1" element={<OrderChoices />} />
        <Route path="otp" element={<TSubmit />} />
      </Routes>

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

          <Route path={PATHS.FAQ} element={<TFaq />} />
          <Route path={PATHS.LOGIN_OTP} element={<TSubmit />} />
          <Route
            path={PATHS.ORDER_PLACED}
            element={
              <TOrderplaced mainText="Order Successfully" subText="Placed!" />
            }
          />
          {/* Protecting routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={PATHS.NOTIFICATION} element={<TNotificationPage />} />
            <Route path={PATHS.COUPONS} element={<TCouponpage />} />
            <Route path={PATHS.PRODUCT_ADD} element={<ProductAdd />} />
            <Route path={PATHS.ORDER} element={<OrderPage />} />
            <Route path={PATHS.ORDER_PREPARE} element={<OrderPrepare />} />
            <Route path={PATHS.ORDER_COMPLETE} element={<OrderComplete />} />
            <Route path={PATHS.PROFILE} element={<ProfilePage />} />
            <Route path={PATHS.CART} element={<CartPage />} />
            {/* @ Tap N Taste Flow Routes */}
            <Route path={PATHS.PAYMENT_SCREEN} element={<PaymentScreen />} />
            <Route path={PATHS.PAYMENT_SUCCESS} element={<PaymentSuccess />} />
            <Route path={PATHS.ORDER_CHOICE} element={<OrderChoice />} />
            <Route path={PATHS.ORDER_CHOICES} element={<OrderChoices />} />
            <Route
              path={PATHS.BOOKING_CONFIRMATION}
              element={<BookingConfirmation />}
            />
            <Route
              path={PATHS.ORDER_PLACED_SCREEN}
              element={<OrderPlacedScreen />}
            />
          </Route>

          <Route path={PATHS.OTP_SUBMIT} element={<TSubmit />} />

          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
        </Routes>
      </main>

      {/* @ Footer Section */}
      <TFooter />

    </Box>
    </Box>
  );
};

export default LandingPage;
