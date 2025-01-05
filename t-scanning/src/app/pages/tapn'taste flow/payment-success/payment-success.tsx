import { Box, Checkbox } from '@mui/material'
import { TButton } from '@tap-n-taste/ui';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
  return (
      <Box className="w-full min-h-screen px-[8%] sm:px-[15%] pt-10 flex justify-center items-center flex-col">
          <h1 className='bg-green-200 mb-20 rounded-lg text-green-700 font-semibold text-2xl sm:text-3xl px-4 py-2'>Payment Sucessfull</h1>
          <TButton text='Back to Home' className={{ text: 'lg:text-xs' }}
            sx={{
              backgroundColor: '#F1414F',
              border: '2px solid #F1414F',
              color: 'white',
              '&:hover': {
                backgroundColor: '#DC3D4A',
              },
              }}
              onClick={() => navigate('/restaurant/:restaurantId')} 
          />
    </Box>
  )
}

export default PaymentSuccess