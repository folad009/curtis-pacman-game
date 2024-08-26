import axios from "axios";
import {
  cloudinary_api_cloudname_endpoint,
  cloudinary_upload_preset,
} from "@/constants";

// Function to upload an image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
  if (!cloudinary_upload_preset || !cloudinary_api_cloudname_endpoint) {
    throw new Error("Cloudinary configuration is missing.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinary_upload_preset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary_api_cloudname_endpoint}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Cloudinary response:", response.data);

    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Error uploading image to Cloudinary:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
