import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '../../../assets/Vector.png'; // Replace with your tick image import
import CloseIcon from '../../../assets/maki_cross.png'; // Replace with your cross image import

// Define the type for the props
interface EventPopupProps {
  onClose: () => void; // Type for onClose function
}

const EventPopup: React.FC<EventPopupProps> = ({ onClose }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          height: '500px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}
      >
        {/* Close Icon */}
        <Box
          component="img"
          src={CloseIcon}
          alt="Close"
          sx={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
          }}
          onClick={onClose} // Use the onClose prop to close the popup
        />

        {/* Tick Icon */}
        <Box
          component="img"
          src={CheckIcon}
          alt="Success"
          sx={{
            width: '170px',
            height: '171.01px',
            marginBottom: '16px',
          }}
        />

        {/* Success Message */}
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '32px',
            lineHeight: '150%',
            textAlign: 'center',
            color: '#F1414F',
          }}
        >
          Successfully
          <br />
          Signed Up!
        </Typography>
      </Box>
    </Box>
  );
};

// Main component where the popup is shown directly
const AddEvent: React.FC = () => {
  const [isPopupOpen] = useState(true); // Set the popup to be open by default

  // Function to close the popup
  const handleClosePopup = () => {
    // Here you can handle the popup close, but since the popup opens immediately, we won't trigger it in this case.
  };

  return (
    <div>
      {/* EventPopup is always visible when the component is loaded */}
      {isPopupOpen && <EventPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default AddEvent;
