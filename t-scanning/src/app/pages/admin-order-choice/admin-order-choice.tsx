import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TFooter } from '@tap-n-taste/ui';
import deliveryIcon from '../../../assets/Ellipse 165.png';
import takeAwayIcon from '../../../assets/Ellipse 166.png';
import dineInIcon from '../../../assets/Ellipse 166.png';
import bellIcon from '../../../assets/hugeicons_notification-02.png';

export const OrderChoices = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDineInPopup, setShowDineInPopup] = useState<boolean>(false);
  const [modifyDescription, setModifyDescription] = useState<boolean>(false);
  const [showTakeAwayPopup, setShowTakeAwayPopup] = useState<boolean>(false);
  const [showTakeAwayOptions, setShowTakeAwayOptions] = useState<boolean>(false);
  const [takeAwayChoice, setTakeAwayChoice] = useState<string | null>(null); 
  const [popupSelection, setPopupSelection] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize the navigate function
  const [timer, setTimer] = useState<number>(7200);

  const handleConfirmClick = () => {
    if (selectedOption === 'dinein') {
      setShowDineInPopup(true);
    }
  };

  const handlePopupSelection = (choice: string) => {
    setPopupSelection(choice);
    if (choice === 'yes') {
      // Navigate to the 'OrderChoice1' page
      navigate('/restaurant/:restaurantId/order-choices-1');
    } else {
      setShowDineInPopup(false); // Close the dine-in popup if 'No' is selected
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowTakeAwayOptions(option === 'takeaway');
    if (option !== 'takeaway') {
      setTakeAwayChoice(null); // Reset takeaway-specific choices
    }
  };

  const handleTakeAwayChoice = (choice: string) => {
    setTakeAwayChoice(choice);
    if (choice === 'pickupNow') {
      setShowTakeAwayPopup(true);
    }
  };

  const handleCloseDineInPopup = () => {
    setShowDineInPopup(false); // Close the dine-in popup
  };

  const handleCloseTakeAwayPopup = () => {
    setShowTakeAwayPopup(false); // Close the take-away popup
  };

  useEffect(() => {
    if (showTakeAwayPopup && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showTakeAwayPopup, timer]);

  



  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '16px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '90%',
          maxWidth: '400px',
          height: '100vh',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          padding: '16px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontSize: '18px', cursor: 'pointer' }}>&lt;</span>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 400,
              marginLeft: '-220px',
            }}
          >
            Order Choices
          </h2>
          <img
            src={bellIcon}
            alt="Notification Bell"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          />
        </div>
        {/* Modify Description with Toggle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '8px',
            borderRadius: '8px',
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: '500' }}>Modify Description</span>
          <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
            <input
              type="checkbox"
              checked={modifyDescription}
              onChange={() => setModifyDescription(!modifyDescription)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: modifyDescription ? '#f44336' : '#ccc',
                borderRadius: '20px',
                transition: '.4s',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  height: '16px',
                  width: '16px',
                  left: '2px',
                  bottom: '2px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: '.4s',
                  transform: modifyDescription ? 'translateX(20px)' : 'translateX(0)',
                }}
              />
            </span>
          </label>
        </div>

        {/* Main Content */}
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 550,
            color: '#000000',
            margin: '20px 0 10px',
          }}
        >
          Hi Name!
        </h1>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: '#000000',
            marginBottom: '16px',
          }}
        >
          How Would You Like to Receive your Order?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '12px',
              margin: '12px 0',
              border:
                selectedOption === 'delivery'
                  ? '2px solid #f44336'
                  : '1px solid #e6e6e6',
              cursor: 'pointer',
              width: '100%',
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
            onClick={() => handleOptionClick('delivery')}
          >
            <img
              src={deliveryIcon}
              alt="Delivery"
              style={{ width: '40px', height: '40px', marginRight: '12px' }}
            />
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#075eab',
                  margin: 0,
                }}
              >
                Delivery
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 470,
                  color: '#000000',
                  margin: 0,
                }}
              >
                Have your meal delivered to your door!
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '12px',
              margin: '12px 0',
              border:
                selectedOption === 'takeaway'
                  ? '2px solid #f44336'
                  : '1px solid #e6e6e6',
              cursor: 'pointer',
              width: '100%',
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
            onClick={() => handleOptionClick('takeaway')}
          >
            <img
              src={takeAwayIcon}
              alt="Take Away"
              style={{ width: '40px', height: '40px', marginRight: '12px' }}
            />
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#039719',
                  margin: 0,
                }}
              >
                Take Away
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 470,
                  color: '#000000',
                  margin: 0,
                }}
              >
                Pick up and enjoy!
              </p>
            </div>
          </div>
          {/* Additional Take Away Options */}
          {showTakeAwayOptions && (
            <div style={{ marginLeft: '0px', marginTop: '-10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  margin: '12px 0',
                  border: '1px solid #e6e6e6',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => handleTakeAwayChoice('pickupNow')}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#000000',
                    margin: 0,
                  }}
                >
                  Pick Up Now
                </h3>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '12px',
                  margin: '8px 0',
                  border: '1px solid #e6e6e6',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.3s',
                }}
                onClick={() => handleTakeAwayChoice('scheduleLater')}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#000000',
                    margin: 0,
                  }}
                >
                  Schedule Later
                </h3>
              </div>



            
            </div>
          )}



          


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '12px',
              margin: '12px 0',
              border:
                selectedOption === 'dinein'
                  ? '2px solid #f44336'
                  : '1px solid #e6e6e6',
              cursor: 'pointer',
              width: '100%',
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
            onClick={() => handleOptionClick('dinein')}
          >
            <img
              src={dineInIcon}
              alt="Dine In"
              style={{ width: '40px', height: '40px', marginRight: '12px' }}
            />
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#F97316',
                  margin: 0,
                }}
              >
                Dine-in
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 470,
                  color: '#000000',
                  margin: 0,
                }}
              >
                Relax and enjoy your meal!
              </p>
            </div>
          </div>
        </div>
       
         {/* + Add Button */}
        <button
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '10px',
          }}
        >
          + ADD
        </button>
        
        {/* Footer */}
        <div
          style={{
            width: '100%',
            position: 'absolute',
             bottom: 0,
            marginTop: '0px',
            borderTop: '1px solid #e6e6e6',
          }}
        >
          <TFooter />
        </div>
      </div>

    </div>
  );
};
export default OrderChoices;