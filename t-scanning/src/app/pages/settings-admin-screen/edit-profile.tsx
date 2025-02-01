import React, { useState } from "react";
import defaultPersonImage from "../../../assets/Group (1).png"; 

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Nithin Chandra",
    contact: "9000012345",
    email: "Stonewater@gmail.com",
    address: "Door 8-9/2, Rushikonda, Visakhapatnam",
    role: "Admin",
  });

  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    if (buttonType === "cancel") {
      // Reset form or navigate away
      console.log("Cancel clicked");
    } else if (buttonType === "save") {
      // Save details logic
      console.log("Save details: ", formData);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "90%",
          maxWidth: "400px",
          height: "90%",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "8px",
              }}
            >
              &lt;
            </button>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "normal" }}>
              Edit Profile
            </h3>
          </div>
        </div>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 10px",
            }}
          >
            <img
              src={defaultPersonImage}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </div>
        </div>

        <div>
          <div style={{ position: "relative", marginBottom: "15px" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#7d7d7d",
                position: "absolute",
                top: "-10px",
                left: "10px",
                backgroundColor: "#ffffff",
                padding: "0 5px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>
          <div style={{ position: "relative", marginBottom: "15px" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#7d7d7d",
                position: "absolute",
                top: "-10px",
                left: "10px",
                backgroundColor: "#ffffff",
                padding: "0 5px",
              }}
            >
              Contacts
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => handleInputChange(e, "contact")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          </div>
          <div style={{ position: "relative", marginBottom: "15px" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#7d7d7d",
                position: "absolute",
                top: "-10px",
                left: "10px",
                backgroundColor: "#ffffff",
                padding: "0 5px",
              }}
            >
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange(e, "address")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <label
              style={{
                fontSize: "14px",
                color: "#7d7d7d",
                position: "absolute",
                top: "-10px",
                left: "10px",
                backgroundColor: "#ffffff",
                padding: "0 5px",
              }}
            >
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange(e, "role")}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <button
            onClick={() => handleButtonClick("cancel")}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #f44336",
              backgroundColor: activeButton === "cancel" ? "#f44336" : "#ffffff",
              color: activeButton === "cancel" ? "#ffffff" : "#f44336",
              fontWeight: "bold",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => handleButtonClick("save")}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #f44336",
              backgroundColor: activeButton === "save" ? "#f44336" : "#ffffff",
              color: activeButton === "save" ? "#ffffff" : "#f44336",
              fontWeight: "bold",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Save details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;