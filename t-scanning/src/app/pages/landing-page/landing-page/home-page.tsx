import { Box } from '@mui/material';
import {
  TAbout,
  TCategory,
  TFaq,
  TFooter,
  TManage,
  TopNav,
  TTableSelector,
  TViewBar,
} from '@tap-n-taste/ui';
import OfferPage from '../../../../components/OffersPage';
import ChefSpecial from 't-scanning/src/components/ChefSpecial';
import FaqPage from 't-scanning/src/components/FaqPage';
import IssueSection from 't-scanning/src/components/IssueSection';
import GalleryPage from 't-scanning/src/components/GalleryPage';
import TopCustomerLikes from 't-scanning/src/components/TopCustomerLikes';
import { RestaurantInfoPage } from 't-scanning/src/components/RestaurantInfoPage';
import ReviewPage from 't-scanning/src/components/ReviewCard';
import {useFetchRestaurantData} from '@tap-n-taste/hooks'
import { RootState } from '@tap-n-taste/utils';
import { useSelector } from 'react-redux';
export const HomePage = () => {
  const { restaurantData } = useSelector((state: RootState) => state.restaurant);
  
  
  return (
    <Box className="px-[8%] sm:px-[15%]">
      {/* Top Navigation Bar */}

      {/* Table Selector */}
      <Box className="w-full flex items-center justify-center">
        <TTableSelector />
      </Box>

      {/* Restaurant Information */}
      <RestaurantInfoPage
        restaurantName="Stone Water"
        restaurantDesc="North Indian | Chinese | Thai"
        restaurantAddress="Door 8-9/2, Rushikonda, Visakhapatnam"
        isOpen={true}
        closingTime={11}
        daysOperate="Mon-Fri"
        deliveryAndDinning={true}
        distance={2.2}
        ratings={4.5}
        restaurantData={restaurantData}
      />

      {/* <Box className="flex justify-between items-center mb-8">
        <TManage />
        <TCategory />
      </Box> */}

      <TViewBar />

      {/* Offers Section */}
      <OfferPage />

      {/* Top Customer Likes Section */}
      <TopCustomerLikes />

      {/* Chef Special Section */}
      <ChefSpecial />

      {/* Photo Gallery */}
      <GalleryPage />

      {/* Review Section */}
      <ReviewPage />

      {/* FAQ Section */}
      <FaqPage />

      {/* Issue */}
      <IssueSection />

      {/* FAQ Section */}
      <TFaq />

      {/* About Section */}
      <TAbout />

      {/* Bottom Text */}
      <Box className="mt-10 mb-5 pb-20 sm:pb-0">
        <h1 className="text-center font-semibold text-sm text-zinc-500">
          Powered by Tap'nTaste
        </h1>
      </Box>
    </Box>
  );
};

export default HomePage;
