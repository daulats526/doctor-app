import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcryptjs';
import { uploadImageToCloudinary } from '../middlewares/uploadImage.js';
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointmentModel.js'
import User from '../models/userModel.js';
// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        // console.log("Processing addDoctor request...");

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.files?.image; // Access the uploaded file from req.files (express-fileupload)

        // Check for all required data
        if (!name || !email || !password || !speciality || !degree || !experience ||
            !about || !fees || !address || !imageFile) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Log file information for debugging
        // console.log("Uploaded file info:", imageFile);

        // Upload the image to Cloudinary
        const imageUpload = await uploadImageToCloudinary(
            imageFile.tempFilePath, // Use tempFilePath provided by express-fileupload
            process.env.FOLDER_NAME
        );
        const imageUrl = imageUpload.url; // Get the secure URL of the uploaded image

        // Add the doctor to the database
        const newDoctor = await doctorModel.create({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            image: imageUrl,
        });

        // Send a success response
        res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor: newDoctor,
        });

        // console.log("Doctor added:", newDoctor);
    } catch (error) {
        console.error("Error while adding doctor:", error);
        res.status(500).json({
            message: "Failed to add doctor",
            error: error.message,
        });
    }
};

//admin login

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json(
                {
                    success: true,
                    token
                }
            )
        } else {
            ReactDOM.json(
                {
                    success: false,
                    message: "invalid email id and password"
                }
            )
        }
    }
    catch (error) {

    }
}

//get aall docors 
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({
            success: true,
            doctors: doctors
        });
    }
    catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to get all doctors",
        })
    }
}
//get all apointment
const allAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
        res.json({
            success: true,
            message:"here all appointment",
            appointments: appointments
        });
    }
    catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to get all appointments",
        })
    }
 
}
   //cancelappointment
   const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
     // Fetch the appointment
        const appointment = await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true});
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found.",
                success: false,
            });
        }


        // Mark the appointment as cancelled (soft delete approach)
        // appointment.cancelled = true; 
        await appointment.save();

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
//get dashboard data for admin panl
const getDashboardData = async (req, res) => {
    try {
        const appointments = await Appointment.find({cancelled:false})
        const cancelledAppointments = await Appointment.find({cancelled:true}).countDocuments();
        const doctors = await doctorModel.find({})
        const user = await User.find({})

        const dashData = {
            doctors: doctors.length,
            users: user.length,
            appointments: appointments.length,
            cancelledAppointments: cancelledAppointments,
            latestAppointment: appointments.reverse().slice(0,5)
        }
        return res.status(200).json({
            dashData,
            success:true,
            message:"all data"
        })
    }catch(error){
            console.log("error while fetching dashboard data",error);
            res.json({
                success:false,
                message:error.message
            })
    }
}

export { addDoctor, adminLogin, allDoctors, allAppointments, cancelAppointment, getDashboardData};
