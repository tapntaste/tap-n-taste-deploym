import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@tap-n-taste/utils';

interface MenuItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: {
    menuItem: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export const CartTable: React.FC<{ cart: CartProps['cart'] }> = ({ cart }) => {
  const { restaurantData, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );
  const calculateSubtotal = (cart: CartProps['cart']) =>
    cart?.reduce((sum, item) => sum + item?.menuItem?.price * item?.quantity, 0);
  const serviceFee = restaurantData?.tax[1]?.value;
  const serviceFees = restaurantData?.tax[0]?.value / 100;
  const subtotal = calculateSubtotal(cart);
  const taxes = subtotal * serviceFees; // Assuming 10% tax rate
  const total = subtotal + taxes + serviceFee;

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: 4,
        backgroundColor: '#f5f5f5',
        padding: 3,
        borderRadius: 3,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Order Summary
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography fontWeight="bold">Item</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography fontWeight="bold">Quantity</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold">Price</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold">Subtotal</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart?.map((item, index) => (
            <TableRow key={index} className="flex flex-wrap">
              <TableCell>
                <Typography>{item?.menuItem?.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{item?.quantity}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>₹{item?.menuItem?.price?.toFixed(2)}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>
                  ₹{(item?.menuItem?.price * item?.quantity)?.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography fontWeight="bold">Subtotal</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold">₹{subtotal}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography>Taxes & Fees (18%)</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>₹{taxes?.toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography>Service Fee</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>₹{serviceFee?.toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography fontWeight="bold" fontSize="1.2rem">
                Total
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography fontWeight="bold" fontSize="1.2rem">
                ₹{total?.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default CartTable;
