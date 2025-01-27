import exprees from 'express'
import {doctorLogin,doctorDashboard, getDoctorAppointment, markAppointmentComplete, cancelAppointment, doctorProfile, updateDoctorProfile} from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRoute = exprees.Router()

doctorRoute.post('/doclogin', doctorLogin)
doctorRoute.get('/appointment', authDoctor, getDoctorAppointment)
doctorRoute.post('/appointment-complete', authDoctor, markAppointmentComplete)
doctorRoute.post('/appointment-cancel', authDoctor, cancelAppointment)
doctorRoute.get('/dashboard', authDoctor, doctorDashboard)
doctorRoute.get('/profile', authDoctor, doctorProfile)
doctorRoute.put('/update-profile', authDoctor, updateDoctorProfile)


export default doctorRoute;
