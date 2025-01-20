import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { TButton } from '@tap-n-taste/ui';
import ProfilePic from '../../../assets/Group.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@tap-n-taste/utils';
import { logoutUser } from 'libs/utils/src/store/authSlice';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const [userName, setUserName] = useState('');
  const authState = useSelector((state: RootState) => state.auth);
  const {restaurantData} = useSelector((state: RootState) => state.restaurant);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
const navigate=useNavigate()
  const handleLogin = () => {
    navigate('/')
  };

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const handleProfilePage = async (link: string) => {
   navigate(`/restaurant/${restaurantData?._id}/user/${authState?.userData?.id}${link}`)
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Profile Image (Only visible if user is authenticated) */}
        {authState?.userData ? (
          <>
            <img
              src={ProfilePic}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginTop: '90px',
                marginBottom: '50px',
              }}
            />
            <TextField
              label="Enter your name"
              variant="outlined"
              value={userName}
              onChange={handleNameChange}
              sx={{
                width: '80%',
                marginBottom: '10px',
              }}
            />
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
              }}
            >
              {authState?.userData?.name || 'Your Name'}
            </h2>

            {/* Edit Profile Button */}
            <TButton
              text="Edit profile"
              className={{ root: 'hover:bg-gray-100', text: 'capitalize' }}
              sx={{
                color: '#F1414F',
                border: '1px solid #F1414F',
                padding: '4px 10px',
                fontSize: '14px',
                fontWeight: 500,
              }}
            />

            {/* List Buttons for Authenticated Users */}
            <Box sx={{ width: '100%', marginTop: '20px' }}>
              <Button
                fullWidth
                sx={{
                  textAlign: 'left',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: 'black',
                  padding: '15px 0',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: '15px',
                  backgroundColor: '#f1f1f1',
                  '&:hover': { backgroundColor: '#FFE2E4' },
                }}
                onClick={()=>{
                  handleProfilePage('/coupons')
                 }}
              >
                <LocalOfferOutlinedIcon
                  sx={{ color: 'red', marginRight: '10px' }}
                />
                Coupons
              </Button>
              <Button
                fullWidth
                sx={{
                  textAlign: 'left',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: 'black',
                  padding: '15px 0',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: '15px',
                  backgroundColor: '#f1f1f1',
                  marginTop: '10px',
                  '&:hover': { backgroundColor: '#FFE2E4' },
                }}
               onClick={()=>{
                handleProfilePage('/order-complete')
               }}
              >
                <ReorderOutlinedIcon
                  sx={{ color: 'red', marginRight: '10px' }}
                />
                Orders
              </Button>
              <Button
                fullWidth
                sx={{
                  textAlign: 'left',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: 'black',
                  padding: '15px 0',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: '15px',
                  backgroundColor: '#f1f1f1',
                  marginTop: '10px',
                  '&:hover': { backgroundColor: '#FFE2E4' },
                }}
                onClick={()=>{
                  handleProfilePage('/notification')
                 }}
              >
                <NotificationsOutlinedIcon
                  sx={{ color: 'red', marginRight: '10px' }}
                />
                Notifications
              </Button>
              <Button
                fullWidth
                sx={{
                  textAlign: 'left',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: 'black',
                  padding: '15px 0',
                  backgroundColor: '#f1f1f1',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: '15px',
                  '&:hover': { backgroundColor: '#FFE2E4' },
                  marginTop: '10px',
                }}
              >
                <QuestionMarkOutlinedIcon
                  sx={{ color: 'red', marginRight: '10px' }}
                />
                Help
              </Button>
            </Box>

            {/* Logout Button */}
            <TButton
              text="LOGOUT"
              onClick={handleLogout}
              className={{ root: 'hover:bg-red-100', text: 'capitalize' }}
              sx={{
                color: 'white',
                width: '100%',
                backgroundColor: 'red',
                padding: '13px 0',
                borderRadius: '10px',
                fontWeight: 500,
                fontSize: '14px',
                marginTop: '20px',
              }}
            />
          </>
        ) : (
          // Login Button for Non-authenticated Users
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                fontFamily: 'Poppins',
                marginBottom: '20px',
              }}
            >
              You are not logged in.
            </Typography>
            <TButton variant="contained" onClick={handleLogin} text="Login" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
