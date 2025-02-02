import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointmentModel.js'
import { uploadImageToCloudinary } from '../middlewares/uploadImage.js';
import doctorModel from '../models/doctorModel.js';


//api to ragister user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use",
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({
            message: "User created successfully",
            success: true,
            token: token
        });
    }
    catch (error) {
        console.log(error),
            res.status(500).json({ message: "Error registering user" });
    }
}

//login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "72h"
        });
        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token: token
        });
    }
    catch (error) {
        console.log(error),
            res.status(500).json({ message: "Error logging in user" });
    }
}

//user profile data

const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        res.status(200).json({
            message: "User profile data", success: true, user
        });
    }
    catch (error) {
        console.log(error),
            res.status(500).json({ message: "Error fetching user profile" });
    }
}

//update profile

const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender, email, password } = req.body;
        const imageFile = req.files?.image;

       

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        // Handle password hashing if provided
        let newHashedPassword = user.password; // Retain existing password
        if (password) {
            newHashedPassword = await bcrypt.hash(password, 10);
        }

        // Handle image upload
        let imageUrl = user.image; // Retain current image URL
        if (imageFile) {
            try {
                const imageUpload = await uploadImageToCloudinary(
                    imageFile.tempFilePath,
                    process.env.FOLDER_NAME
                );
                imageUrl = imageUpload.url;
            } catch (imageError) {
                console.error("Image upload failed:", imageError);
                return res.status(500).json({
                    message: "Failed to upload image.",
                    success: false,
                });
            }
        }

        // Update user details
        user.name = name;
        user.phone = phone;
        user.address = address;
        user.dob = dob;
        user.gender = gender;
        user.email = email || user.email; // Retain current email if not provided
        user.password = newHashedPassword; // Use updated password if provided
        user.image = imageUrl; // Use updated image if provided

        // Save updated user
        await user.save();

        // Send success response
        return res.status(200).json({
            message: "User profile updated successfully.",
            success: true,
            user,
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({
            message: "An error occurred while updating the user profile.",
            success: false,
            error: error.message, // Optional: Include error details for debugging
        });
    }
};


//book appointment

const BookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        // Validate required fields
        if (!userId || !docId || !slotDate || !slotTime) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        // Parse and validate the slotDate
        const parsedDate = new Date(slotDate);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                message: "Invalid date format. Please use 'YYYY-MM-DD'.",
                success: false,
            });
        }

        // Fetch doctor details
        const doctor = await doctorModel.findById(docId).select("-password");
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
                success: false,
            });
        }

        // Check doctor's availability
        if (!doctor.available) {
            return res.status(400).json({
                message: "Doctor is not available for this slot",
                success: false,
            });
        }

        // Initialize and validate slots
        const slotsBooked = doctor.slots_booked || {};
        if (!slotsBooked[slotDate]) slotsBooked[slotDate] = [];
        if (slotsBooked[slotDate].includes(slotTime)) {
            return res.status(400).json({
                message: "Slot is already booked",
                success: false,
            });
        }

        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Update doctor's booked slots
        slotsBooked[slotDate].push(slotTime);
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slotsBooked });

        // Add appointment to user's list
        user.appointments.push(docId);
        await user.save();

        // Prepare appointment data
        const appointmentData = {
            userId,
            doctorId: docId,
            docData: {
                name: doctor.name,
                email: doctor.email,
                image: doctor.image,
                address: doctor.address,
                speciality: doctor.speciality,
            },
            date: parsedDate, // Use the parsed and validated date
            time: slotTime,
            userData: {
                name: user.name,
                email: user.email,
                image: user.image,
                dob: user.dob
            },
            amount: doctor.fees,
            cancelled: false,
            payment: false,
            isCompleted: false,
        };

        // Save appointment
        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();

        res.status(200).json({
            message: "Appointment booked successfully",
            success: true,
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({
            message: "An error occurred while booking the appointment",
            success: false,
            error: error.message,
        });
    }
};

// get all list appintment that user is booked

const getAllAppointments = async (req, res) => {
    try {
        const userId = req.body;
        const appointments = await Appointment.find(userId);
        res.status(200).json({
            message: "Appointments retrieved successfully",
            success: true,
            appointments: appointments,
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({
            message: "An error occurred while fetching appointments",
            success: false,
            error: error.message,
        });
    }
}

//cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId, userId } = req.body;

        // Validate request body
        if (!userId || !appointmentId) {
            return res.status(400).json({
                message: "User ID and Appointment ID are required.",
                success: false,
            });
        }

        // Fetch the appointment
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found.",
                success: false,
            });
        }

        // Authorization check
        if (appointment.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to cancel this appointment.",
                success: false,
            });
        }

        // Mark the appointment as cancelled (soft delete approach)
        appointment.cancelled = true; // Assuming you have a `status` field in your model
        await appointment.updateOne();

        return res.status(200).json({
            message: "Appointment cancelled successfully.",
            success: true,
        });
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return res.status(500).json({
            message: "An error occurred while cancelling the appointment.",
            success: false,
            error: error.message,
        });
    }
};





export { registerUser, loginUser, getUserProfile, updateUserProfile, BookAppointment, getAllAppointments,
    cancelAppointment
 };