import React, { useState } from "react";

const Event: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("Select Date");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [eventType, setEventType] = useState<string>("Musical");
  const [ticketType, setTicketType] = useState<string>("VIP");
  const [ageLimit, setAgeLimit] = useState<number>(21);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    setSelectedDate(date);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setUploadedImage(imageUrl);
    }
  };

  const handleAdditionalImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setAdditionalImages((prev) => [...prev, imageUrl].slice(0, 2));
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            fontWeight: "400",
            color: "#000",
          }}
        >
          &lt; Add Event
        </span>
        <div>
          <span
            style={{
              color: "red",
              fontWeight: "500",
              fontSize: "14px",
              marginRight: "10px",
            }}
          >
            {selectedDate}
          </span>
          <input
            type="date"
            onChange={handleDateChange}
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "5px",
            }}
          />
        </div>
      </div>

      {/* Upload Image */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <label
          htmlFor="upload-image"
          style={{
            display: "block",
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
                margin: "0 auto",
              }}
            />
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                background: "#fce4ec",
                border: "2px dashed #f06292",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                color: "#f06292",
                margin: "0 auto",
              }}
            >
              Upload Image
            </div>
          )}
        </label>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Input Fields */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {["Enter Event Name", "Enter Event Address", "₹ Enter Event Price"].map(
          (placeholder, index) => (
            <input
              key={index}
              type="text"
              placeholder={placeholder}
              style={{
                padding: "10px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
              }}
            />
          )
        )}
        <textarea
          placeholder="Enter Event Description.."
          style={{
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            resize: "none",
            height: "100px",
            backgroundColor: "#f5f5f5",
          }}
        ></textarea>
      </div>

      {/* Dropdowns */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {[
          { label: "Choose Event Type", value: eventType, setValue: setEventType, options: ["Musical", "Classical", "Dance"] },
          { label: "Choose Ticket Type", value: ticketType, setValue: setTicketType, options: ["VIP", "Gold", "Monthly"] },
        ].map((dropdown, index) => (
          <div key={index} style={{ width: "48%" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: "500",
              }}
            >
              {dropdown.label}
            </label>
            <select
              value={dropdown.value}
              onChange={(e) => dropdown.setValue(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
              }}
            >
              {dropdown.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Additional Images and Age Limit */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ width: "48%" }}>
          <label
            htmlFor="upload-additional-image"
            style={{
              display: "block",
              cursor: "pointer",
            }}
          >
            {additionalImages.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                {additionalImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Additional ${index}`}
                    style={{
                      width: "48%",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  background: "#fce4ec",
                  border: "2px dashed #f06292",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "5px",
                  color: "#f06292",
                }}
              >
                Upload Additional Images
              </div>
            )}
          </label>
          <input
            id="upload-additional-image"
            type="file"
            accept="image/*"
            onChange={handleAdditionalImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <div style={{ width: "48%" }}>
          <label
            htmlFor="age-limit"
            style={{
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            Manage Age Limit
          </label>
          <select
            id="age-limit"
            value={ageLimit}
            onChange={(e) => setAgeLimit(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              backgroundColor: "#f5f5f5",
            }}
          >
            {Array.from({ length: 8 }, (_, i) => i + 18).map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Item Button */}
      <button
        style={{
          width: "100%",
          padding: "20px",
          backgroundColor: "#f1414f",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Add Item
      </button>
    </div>
  );
};

export default Event;
