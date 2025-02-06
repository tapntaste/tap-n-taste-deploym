import React, { useState } from 'react';

const AddChoice = () => {
  const [image, setImage] = useState<string | null>(null);
  const [orderName, setOrderName] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [orderCondition, setOrderCondition] = useState('');
  const [addCondition, setAddCondition] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
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
          height: '100vh', // Full height
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header Section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span
            style={{ fontSize: '18px', cursor: 'pointer' }}
            onClick={() => window.history.back()}
          >
            &lt;
          </span>
          <h2
            style={{
              fontSize: '16px',
              fontWeight: 500,
              marginLeft: '12px',
            }}
          >
            Add Choice
          </h2>
        </div>

        {/* Content Wrapper (Keeps components in place) */}
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Keeps content positioned correctly
          }}
        >
          {/* Upload Logo */}
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <label htmlFor="upload-logo" style={{ cursor: 'pointer' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE5E5',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto',
                  overflow: 'hidden',
                }}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src="/path-to-default-upload-icon.png"
                    alt="Upload Icon"
                    style={{ width: '40px', height: '40px' }}
                  />
                )}
              </div>
            </label>
            <input
              id="upload-logo"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <p
              style={{
                fontSize: '14px',
                fontWeight: 500,
                marginTop: '8px',
                color: '#333',
              }}
            >
              Upload Logo
            </p>
          </div>

          {/* Input Fields */}
          <input
            type="text"
            placeholder="Enter Order Choice Name"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              marginBottom: '10px',
              fontSize: '14px',
            }}
          />

          <textarea
            placeholder="Enter Order Choice Description.."
            value={orderDescription}
            onChange={(e) => setOrderDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              height: '80px',
              fontSize: '14px',
              resize: 'none',
            }}
          />

          <input
            type="text"
            placeholder="Enter if any condition"
            value={orderCondition}
            onChange={(e) => setOrderCondition(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              marginTop: '10px',
              fontSize: '14px',
            }}
          />

          {/* Add Condition Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '12px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#fff',
            }}
            onClick={() => setAddCondition(!addCondition)}
          >
            <input
              type="checkbox"
              checked={addCondition}
              onChange={() => setAddCondition(!addCondition)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>
              Add condition
            </span>
          </div>
        </div>

        {/* Add Choice Button at the Bottom */}
        <button
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            backgroundColor: '#f44336',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            marginTop: 'auto', // Pushes button to the bottom
            cursor: 'pointer',
          }}
        >
          Add Choice
        </button>
      </div>
    </div>
  );
};

export default AddChoice;
