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

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };



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



            {takeAwayChoice === 'scheduleLater' && (
              <p
                style={{
                  color: 'red',
                  fontSize: '12px',
                  fontWeight: 400,
                  marginTop: '-8px',
                  marginBottom: '12px',
                }}
              >
                Your order is scheduled for [Date] at [Time].
              </p>
            )}
            </div>
          )}



          {/* Popup */}
      {showTakeAwayPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              width: '90%',
              maxWidth: '400px',
              position: 'relative',
              textAlign: 'center',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              onClick={handleCloseTakeAwayPopup}
            >
              &times;
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>
              Pick Time for Pickup
            </h2>
            <h3 style={{ fontSize: '20px', margin: '20px 0', fontWeight: 500 }}>
              {formatTime(timer)}
            </h3>
            <p style={{ fontSize: '20px', color: 'red' }}>
              Your order is scheduled for [date and time]
            </p>
            <button
              style={{
                backgroundColor: '#f44336',
                color: '#fff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '20px',
              }}
              onClick={handleCloseTakeAwayPopup}
            >
              Confirm
            </button>
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
        {selectedOption && (
          <button
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              backgroundColor: '#f44336',
              color: 'white',
              fontSize: '16px',
              fontWeight: 500,
              border: 'none',
              borderRadius: '15px',
              marginTop: '20px',
              cursor: 'pointer',
            }}
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        )}

        {/* Pop-up */}
        {showDineInPopup && (
          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              width: '100%',
              height: '25%',
              maxWidth: '370px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#f44336',
                marginBottom: '16px',
                textAlign: 'center',
              }}
            >
              Would you like to make a reservation?
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                width: '100%',
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: '1px solid #f44336',
                  backgroundColor:
                    popupSelection === 'no' ? '#f44336' : '#ffffff',
                  color: popupSelection === 'no' ? '#ffffff' : '#f44336',
                  cursor: 'pointer',
                }}
                onClick={() => handlePopupSelection('no')}
              >
                No
              </button>
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 500,
                  border: '1px solid #f44336',
                  backgroundColor:
                    popupSelection === 'yes' ? '#f44336' : '#ffffff',
                  color: popupSelection === 'yes' ? '#ffffff' : '#f44336',
                  cursor: 'pointer',
                }}
                onClick={() => handlePopupSelection('yes')}
              >
                Yes
              </button>
            </div>
          </div>
        )}
        {/* Footer */}
        <div
          style={{
            width: '100%',

            marginTop: 'auto',
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