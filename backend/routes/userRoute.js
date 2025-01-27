import express from 'express'
import {registerUser, loginUser, getUserProfile, updateUserProfile, BookAppointment, getAllAppointments, cancelAppointment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'


const userrouter = express.Router()


userrouter.post('/register', registerUser)
userrouter.post('/login', loginUser)
userrouter.get('/profile',authUser, getUserProfile)
userrouter.put('/update', updateUserProfile)
userrouter.post('/bookappointment',authUser, BookAppointment)
userrouter.get('/allappointments',authUser, getAllAppointments)
userrouter.post('/cancelappointment',authUser, cancelAppointment)

export default userrouter;