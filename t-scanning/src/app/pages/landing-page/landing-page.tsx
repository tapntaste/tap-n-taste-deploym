import { TFaq } from '@tap-n-taste/ui';
import CartPage from '../cart-page/cart-page';
import { Routes, Route } from 'react-router-dom';
import HomePage from './landing-page/home-page';
import { LoginSignUp } from '@tap-n-taste/ui';
import { TSubmit } from '@tap-n-taste/ui';
import MenuPage from '../menu-page/menu-page';
import { Box } from '@mui/material';
import { TOrderplaced, TNotificationPage, TCouponpage } from '@tap-n-taste/ui';
import ProductAdd from '../productadd-page/productadd';
import OrderPage from '../order-page/order-page';
import ProfilePage from '../profile-page/profile-page';
import OrderPrepare from '../order-prepare/order-prepare';
import OrderComplete from '../order-complete/order-complete';

import OrderFlow from '../order-flow/order-flow';
import OrderChoices from '../order-choice/order-choice';
import OrderChoice1 from '../order-choice/orderchoice1';
import PopUp from '../sign-up-popup/sign-up-popup';
import AddEvent from '../add-event/add-event'
export const LandingPage = () => {
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
        <Route path="order-choices-1" element={<OrderChoice1 />} />
        <Route path="otp" element={<TSubmit />} />
      </Routes>
    </Box>
  );
};
