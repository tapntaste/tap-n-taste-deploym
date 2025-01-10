import { Box } from '@mui/material';
import {
  TCategory,
  TCustomCard,
  TFoodItemTypes,
  TFooter,
  TManage,
  TopNav,
  TSearchbar,
  TView,
} from '@tap-n-taste/ui';
import CuisinesOffered from '../../../components/CuisinesOffered';
import * as React from 'react';
import BottomInfoPopUp from '../../../components/BottomInfoPopup';
import { menuCardData } from '../../constants/MenuPageData';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

export const MenuPage=() =>{
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <Box className="px-[8%] sm:px-[15%]">
      <TSearchbar />
      <TView />

      <Box className="flex justify-between items-center mb-8">
        <TManage />
        <TCategory />
      </Box>

      <CuisinesOffered />

      {/* Custom Card */}
      <Box className="mb-4">
        {menuCardData.map((item, index) => (
          <TCustomCard
            image={item.image}
            title={item.title}
            description={item.description}
            rating={item.rating}
            price={item.price}
            veg={item.isVeg}
          />
        ))}
      </Box>

      <BottomInfoPopUp noOfItems={3} />
    </Box>
  );
}
