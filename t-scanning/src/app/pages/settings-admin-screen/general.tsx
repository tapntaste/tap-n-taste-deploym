import React, { useState } from 'react';
import defaultPersonImage from '../../../assets/Group (1).png'; 

const General: React.FC = () => {
  const [theme, setTheme] = useState('Light mode'); 
  const [profileImage, setProfileImage] = useState<string | null>(defaultPersonImage); // Default person image
  //const navigate = useNavigate(); // Use for navigation

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setProfileImage(file);
    }
  };// Default theme

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (<div
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
        <div style={{ flex: 1, marginTop: '20px' }}>
          {/* Theme Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <div style={{ color: '#000000' }}>Theme</div>
              <div style={{ color: '#7d7d7d', fontWeight: 'normal' }}>Appearance</div>
            </div>
            <select
              value={theme}
              onChange={handleThemeChange}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '5px',
                fontSize: '14px',
              }}
            >
              <option value="Light mode">Light mode</option>
              <option value="Dark mode">Dark mode</option>
            </select>
          </div>

          {/* Language Preference Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <div style={{ color: '#000000' }}>Language Preference</div>
              <div style={{ color: '#7d7d7d', fontWeight: 'normal' }}>English</div>
            </div>
            <button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: '#f44336',
                cursor: 'pointer',
              }}
            >
              Edit
            </button>
          </div>

          {/* Account Settings Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <div style={{ color: '#000000' }}>Account Settings</div>
              <div style={{ color: '#7d7d7d', fontWeight: 'normal' }}>Delete Account</div>
            </div>
          </div>

          {/* Privacy and Security Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              marginBottom: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            <div>
              <div style={{ color: '#000000' }}>Privacy and Security</div>
              <div style={{ color: '#7d7d7d', fontWeight: 'normal' }}>Password</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
