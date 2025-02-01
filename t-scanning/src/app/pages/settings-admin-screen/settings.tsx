import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog, FaUserAlt, FaBell, FaUtensils, FaSignOutAlt } from 'react-icons/fa';
import defaultPersonImage from '../../../assets/Group (1).png'; // Replace with your person image path

const Settings: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(defaultPersonImage); // Default person image
  const navigate = useNavigate(); // Use for navigation

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setProfileImage(file);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
        overflow: 'hidden',
        fontFamily: 'Poppins, sans-serif',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          width: '90%',
          maxWidth: '400px',
          height: '90%',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '20px',
                cursor: 'pointer',
                marginRight: '8px',
              }}
            >
              &lt;
            </button>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'normal' }}>Settings</h3>
          </div>
        </div>

        {/* Profile Section */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Restaurant Name</h2>
          <label htmlFor="profileImageInput" style={{ cursor: 'pointer' }}>
            <img
              src={profileImage || defaultPersonImage}
              alt="Profile"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <h3 style={{ fontSize: '16px', fontWeight: 'normal', margin: '10px 0' }}>
            Nithin Chandra
          </h3>
        </div>

        {/* Options Section */}
        <div style={{ marginBottom: '10px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f3f3f3',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/restaurant/:restaurantId/general')}
            >
              <FaCog style={{ marginRight: '10px', color: '#f44336' }} />
              General
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f3f3f3',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/restaurant/:restaurantId/edit-profile')}
            >
              <FaUserAlt style={{ marginRight: '10px', color: '#f44336' }} />
              Edit Profile
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f3f3f3',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              <FaBell style={{ marginRight: '10px', color: '#f44336' }} />
              Notifications
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f3f3f3',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/restaurant/:restaurantId/res-details')}
            >
              <FaUtensils style={{ marginRight: '10px', color: '#f44336' }} />
              Edit Restaurant Details
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: '#f3f3f3',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              
            >
              <FaSignOutAlt style={{ marginRight: '10px', color: '#f44336' }} />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
