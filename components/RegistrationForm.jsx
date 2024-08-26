"use client";

import { Image } from "@nextui-org/react";
import React, { useState } from "react";
import { gamerRegistration } from "@/services";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });
  const router = useRouter();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedPhoneNumber = formData.phoneNumber.replace(/\D/g, "");

    if (imageFile) {
      const formValue = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phonenumber: Number(cleanedPhoneNumber),
        location: formData.location,
        uploadUrl: URL.createObjectURL(imageFile),
      };

      try {
        await gamerRegistration(formValue, imageFile);
        alert("Registration successful!");
        router.push("/pacman");
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    } else {
      alert("Please upload an image.");
    }
  };

  return (
    <div
      className="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
      data-rounded="rounded-lg"
      data-rounded-max="rounded-full"
    >
      <h3 className="mb-6 text-2xl font-medium text-center">Register Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="block w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            placeholder="Upload your picture"
          />
          {image && (
            <Image
              src={image}
              alt="Profile"
              className="mt-4 object-cover rounded-full"
              width={200}
              height={200}
            />
          )}
        </div>

        <div>
          <input
            type="text"
            id="firstName"
            className="block w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            id="lastName"
            className="block w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="email"
            id="email"
            className="block w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="tel"
            id="phoneNumber"
            className="block w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            type="text"
            id="location"
            className="block w-full px-4 py-3 mb-4 border-2 border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="block">
          <button
            className="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-lg"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
