import { Box, CardContent, Collapse, TextareaAutosize } from '@mui/material';
import {
  TButton,
  TCustomCard,
  TFooter,
  TLoadingSpinner,
  TopNav,
  TTableSelector,
} from '@tap-n-taste/ui';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import Divider from '@mui/material/Divider';
import ApplyCoupons from '../../../components/ApplyCoupons';
import HotDeals from '../../../components/HotDeals';
import { useEffect, useState } from 'react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { cartPageCardsData } from '../../constants/CartPageData';
import CartTable from 't-scanning/src/components/CartTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import {
  addMenuItemToCartThunk,
  fetchCartItemsThunk,
  removeMenuItemFromCartThunk,
} from 'libs/utils/src/store/cartSlice';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createOrder } from 'libs/utils/src/store/orderSlice';

export const CartPage = () => {
  const [expanded, setExpanded] = useState(false);
  const [cooking, setCooking] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const authState = useSelector((state: RootState) => state.auth);
  const { restaurantData } = useSelector(
    (state: RootState) => state.restaurant
  );
  const navigate = useNavigate();
  const userId = authState?.userData?.id;
  const restaurantId = restaurantData?._id;
  const { userData } = useSelector((state: RootState) => state.auth); // Get the user data
  const { cartItems, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  useEffect(() => {
    dispatch(fetchCartItemsThunk({ userId, restaurantId }));
  }, [dispatch, userId, restaurantId,cartItems.length]);

  const handleOrderCreation = async () => {
    // Create the payload
    const orderData = {
      restaurantId,
      items: cartItems.map((cartItem:any) => ({
        menuId: cartItem.menuItem._id,
        quantity: cartItem.quantity,
      })),
      tableId: userData?.table,
      cookingRequest:cooking
    };
    

    // Dispatch the createOrder thunk
    const result = await dispatch(createOrder(orderData));

    // Handle the result
    if (createOrder.fulfilled.match(result)) {
      console.log('Order created successfully:', result.payload);
    } else {
      console.error('Order creation failed:', result.payload);
    }
  };


  const AddItemHandler = () => {
    // /restaurant/${restaurantId}${navLink.path}
    navigate(`/restaurant/${restaurantId}/menu`);
  };
  if (loading) return <TLoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box className="px-[8%] sm:px-[10%] font-primary">
      <Box className="mt-10 flex items-center justify-between border px-6 py-3 rounded-lg">
        <h1 className="text-primary">Your Table Number is</h1>
        <TTableSelector className="relative" />
      </Box>
      <Box className="mt-10 mb-10">
        {cartItems?.length === 0 ? (
          <Box className="flex flex-col gap-5 justify-center items-center">
            <ShoppingCartIcon className='h-10 w-10'/>
            <h1 className="text-xl font-semibold text-gray-500">
              Your cart is empty
            </h1>
          </Box>
        ) : (
          cartItems.map((item: any) => (
            <TCustomCard
              key={item?.menuItem?._id}
              image={item?.menuItem?.banner || ''}
              title={item?.menuItem?.name || ''}
              description={item?.menuItem?.description || ''}
              rating={item?.menuItem?.ratings?.averageRating || 0}
              price={item?.menuItem?.price || 0}
              veg={item?.menuItem?.isVeg}
              id={item?.menuItem?._id}
              quantity={item?.quantity}
              isAddButton={false}
              isRemoveButton={true}
            />
          ))
        )}
      </Box>
      <Box className="w-full flex justify-between items-center mb-10 ">
        <TButton
          text="Cooking Requests"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          icon={<ExpandMoreOutlined />}
          className={{ text: 'text-primary capitalize font-semibold' }}
        />
        <TButton
          text="Add More Items"
          icon={<ControlPointRoundedIcon className="text-primary" />}
          className={{ text: 'text-primary capitalize font-semibold' }}
          onClick={AddItemHandler}
        />
      </Box>

      <Collapse className="mb-10" in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="h-60">
          <TextareaAutosize
            className="w-full h-60 bg-zinc-200 p-4 rounded-xl"
            placeholder="Add Less Salt & Spices"
            style={{ height: '150px', resize: 'none' }} // This disables the resizing handle
            onChange={(e:any)=>{
              setCooking(e.target.value)
            }}
          />
        </CardContent>
      </Collapse>

      {/* <Divider className="mt-20">
        <h1>Deals & Coupons</h1>
      </Divider> */}

      {/* Apply Coupon  */}
      {/* <ApplyCoupons /> */}

      {/* Hot Deals */}
      {/* <HotDeals /> */}

      <Divider>
        <h1>Your Cart</h1>
      </Divider>

      <CartTable cart={cartItems} />
      <Box className="w-full flex justify-center items-center mb-10">
        <TButton
          text="Place Order"
          sx={{
            width: '100%',
            backgroundColor: '#F1414F',
            border: '2px solid #F1414F',
            color: 'white',
            '&:hover': {
              backgroundColor: '#DC3D4A',
            },
          }}
          onClick={handleOrderCreation}
        />
      </Box>
    </Box>
  );
};

export default CartPage;
