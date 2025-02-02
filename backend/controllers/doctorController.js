import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointmentModel.js'

const changeAvailablity = async (req, res) => {
    try {
        const { docId } = req.body
        const doc = await doctorModel.findById(docId)
        if (!doc) {
            return res.status(404).json({ message: "Doctor not found" })
        }
        await doctorModel.findByIdAndUpdate(docId, { available: !doc.available })
        res.json({
            success: true,
            message: "Availability changed successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to get all doctors",
        })
    }
}
// for doctor login
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email: email })
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ _id: doctor._id, email: doctor.email }, process
            .env.JWT_SECRET)
        res.json({
            success: true,
            token: token,
            message: "Logged in successfully",
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to get all doctors",
        })
    }
}
//get doctor appointment for doctor
const getDoctorAppointment = async (req, res) => {
    try {
        const { docId } = req.body
        // console.log("doctid", docId)
        const appointments = await Appointment.find({ doctorId: docId })
        res.json({
            success: true,
            appointments: appointments,
            message: "all appointment get seccessfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to get all doctors",
            error
        })
    }

}
//mark appoinmetn complete
const markAppointmentComplete = async (req, res) => {
    try {
        const { appointmentId, docId } = req.body
        const appointment = await Appointment.findById(appointmentId)
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" })
        }
        if (appointment && appointment.doctorId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true })

            res.json({
                success: true,
                message: "Appointment marked as completed",
            })
        }


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to mark appointment as completed",
        })
    }
}
//cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId, docId } = req.body
        const appointment = await Appointment.findById(appointmentId)
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" })
        }
        if (appointment && appointment.doctorId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true })
            res.json({
                success: true,
                message: "Appointment cancelled",
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Failed to cancel appointment",
        })
    }
}
//get doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req.body;

        // Validate docId
        if (!docId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }

        // Fetch appointments for the doctor
        const appointments = await Appointment.find({ doctorId: docId });

        // Calculate earnings
        let income = 0;
        appointments.forEach((item) => {
            if (item.isCompleted === true) {
                income += item.amount;
            }
        });

        // Identify unique patients
        const patients = new Set();
        appointments.forEach((item) => {
            patients.add(item.userId);
        });

        // Prepare dashboard data
        const dashData = {
            appointments: appointments.length,
            patients: patients.size,
            income,
            latestAppointments: [...appointments].reverse().slice(0, 5), // Avoid mutating the original array
        };

        // Send success response
        res.status(200).json({
            dashData,
            success: true,
        });
    } catch (error) {
        console.error("Error in doctorDashboard:", error);

        // Send error response
        res.status(500).json({
            success: false,
            message: "Failed to retrieve dashboard data",
            error: error.message,
        });
    }
};
//doctor profile for doctor panal
const doctorProfile = async (req, res) => {
    try {
        // Get doctor ID from the request
        const { docId } = req.body;
        // Fetch doctor data from the database
        const docData = await doctorModel.findById(docId).select('-password');
        // send response
        res.status(200).json({
            docData,
            success: true,
        });
    } catch (error) {
        console.error("Error in doctorProfile:", error);
        // Send error response
        res.status(500).json({
            success: false,
            message: "Failed to retrieve doctor profile",
            error: error.message,
        });
    }
};

//update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        // Get doctor ID and updated data from the request
        const { docId, fees, address, phone, email, available } = req.body;
        // Update doctor data in the database
        const updatedDoc = await doctorModel.findByIdAndUpdate(docId, {
            fees,
            address,
            phone,
            email,
            available
        }, {
            new: true,
        });
        // Send response
        res.status(200).json({
            updatedDoc,
            success: true,
            message:"profile update"
        });
    } catch (error) {
        console.error("Error in updateDoctorProfile:", error);
        // Send error response
        res.status(500).json({
            success: false,
            message: "Failed to update doctor profile",
            error: error.message,
        });
    }
};




export { changeAvailablity, doctorLogin, getDoctorAppointment, markAppointmentComplete, cancelAppointment, doctorDashboard, doctorProfile, updateDoctorProfile }