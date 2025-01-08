import { Box } from '@mui/material';
import { TButton } from '@tap-n-taste/ui';
import SuccessScreen from '../../../../assets/success-screen.png';

const OrderPlacedScreen = () => {
  return (
    <Box className="w-full bg-primary min-h-screen px-[8%] sm:px-[15%] pt-10 flex justify-center items-center flex-col">
      <img src={SuccessScreen} alt="Success Image" className="absolute" />
      <Box className="flex flex-col items-center justify-center mt-52 md:mt-80">
        <h3 className="z-[99] mb-2 md:mb-6 rounded-lg text-primary font-semibold text-2xl sm:text-3xl px-4 py-2">
          Order Placed!
        </h3>
        <TButton
          text="Track Your Order"
          className={{ text: 'lg:text-xs' }}
          sx={{
            backgroundColor: '#F1414F',
            border: '2px solid #F1414F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#DC3D4A',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default OrderPlacedScreen;
