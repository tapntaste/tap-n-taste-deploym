import { Box, Checkbox } from '@mui/material'
import cardImage from "../../../../assets/master-card.png"
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import React from 'react'
import { TButton } from '@tap-n-taste/ui'
import { Link, NavLink, useNavigate } from 'react-router-dom';

export const PaymentScreen = () => {
    
  const navigate = useNavigate();
  return (
      <Box className="w-full min-h-screen px-[8%] sm:px-[15%] pt-10">
          <Box className="flex items-center">
              <KeyboardArrowLeftOutlinedIcon />
              <h1 className='text-2xl font-semibold'>Payment</h1>
          </Box>
          <h1 className='text-xl mt-8'>Choose Payment Method</h1>
          <Box className="mt-10 mb-64">
              {[1, 2, 3].map((i, index) => (
                  <Box className="flex items-center justify-between mt-4" key={index}>
                      <Box className="flex items-center gap-4">
                          <img src={cardImage} />
                          <h1>Mastercard</h1>
                      </Box>
                    <Checkbox defaultChecked color="success" />
              </Box>
              ))}
          </Box>
          <Box className="w-full flex items-center justify-center">
               <TButton text='Make Payment' className={{ text: 'lg:text-xs' }}
            sx={{
              backgroundColor: '#F1414F',
              border: '2px solid #F1414F',
              color: 'white',
              '&:hover': {
                backgroundColor: '#DC3D4A',
              },
              }}
              onClick={() => navigate('/restaurant/:restaurantId/payment-success')} 
          />
         </Box>
    </Box>
  )
}

export default PaymentScreen