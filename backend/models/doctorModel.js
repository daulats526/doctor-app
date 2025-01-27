import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    password: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        // required:true,
        default:true
    },
    fees:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        
    },
    slots_booked:{
        type:Object,
        default:{}
    }
},{minimize:false})


const doctorModel = mongoose.model("doctor", doctorsSchema)

export default doctorModel
