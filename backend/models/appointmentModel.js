import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    docData:{ type:Object, required:true},
    date: { type: Date, required: true }, // Keep this as a single Date field
    time: { type: String, required: true },
    userData: { type: Object, required: true },
    amount: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
});


const Appointment  = mongoose.model('Appointment', appointmentSchema)
export default Appointment;