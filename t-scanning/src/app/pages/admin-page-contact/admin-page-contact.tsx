import React, { useState } from "react";
import phoneIcon from "../../../assets/image 16 (traced).png";
import emailIcon from "../../../assets/image 17 (traced).png";
import locationIcon from "../../../assets/Location (traced).png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "General Inquiry",
    message: "",
  });

  const subjectOptions = ["General Inquiry", "Reservation", "Feedback", "Others"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-5 rounded-2xl shadow-lg">
        <div className="flex items-center">
          <button className="text-2xl font-bold">&lt;</button>
          <h2 className="flex-1 text-center text-xl font-semibold">Contact Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          {/* Name */}
          <div className="relative mb-3">
            <label className="text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg text-sm"
            />
            <button className="absolute top-8 right-2 text-red-500 text-sm font-medium">Edit</button>
          </div>

          {/* Email */}
          <div className="relative mb-3">
            <label className="text-sm font-semibold">Email id</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg text-sm"
              
            />
            <button className="absolute top-8 right-2 text-red-500 text-sm font-medium">Edit</button>
          </div>

          {/* Mobile */}
          <div className="relative mb-3">
            <label className="text-sm font-semibold">Mobile no.</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your Mobile no."
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg text-sm"
            />
            <button className="absolute top-8 right-2 text-red-500 text-sm font-medium">Edit</button>
          </div>

          {/* Subject Dropdown */}
          <div className="relative mb-3">
            <label className="text-sm font-semibold">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg text-sm"
            >
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Buttons */}
          <div className="grid grid-cols-2 gap-2 my-2">
            {subjectOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`py-2 border rounded-lg text-sm font-semibold ${
                  formData.subject === option ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => setFormData({ ...formData, subject: option })}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="text-right text-red-500 text-sm font-medium w-full">Edit Options</button>

          {/* Message */}
          <div className="relative mt-3">
            <label className="text-sm font-semibold">Message</label>
            <textarea
              name="message"
              placeholder="Enter your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-lg text-sm"
              rows={3}
            />
            <button className="absolute top-12 right-2 text-red-500 text-sm font-medium">Edit</button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-red-500 text-white text-lg font-semibold py-2 rounded-lg mt-4">
            Submit message
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-5 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <img src={phoneIcon} alt="Phone" className="w-4 h-4 mr-2" />
              <p className="text-sm">(123) 456-7890</p>
            </div>
            <div className="flex items-center">
              <img src={emailIcon} alt="Email" className="w-4 h-4 mr-2" />
              <p className="text-sm">info@stonewater.com</p>
            </div>
            <div className="flex items-center">
              <img src={locationIcon} alt="Location" className="w-4 h-4 mr-2" />
              <p className="text-sm">123 Food Street, City, Country</p>
            </div>
          </div>
          <button className="text-right text-red-500 text-sm font-medium w-full mt-2">Edit Details</button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
