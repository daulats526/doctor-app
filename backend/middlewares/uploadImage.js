import { v2 as cloudinary } from 'cloudinary';

export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder }; // Specify the folder for storing the image
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto"; // Ensures it handles images, videos, etc.

    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file, options);
        console.log("Cloudinary upload result:", result);
        return result; // Return the result from Cloudinary
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload image to Cloudinary");
    }
};

