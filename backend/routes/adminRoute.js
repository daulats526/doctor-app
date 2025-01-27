import express from 'express';
import { addDoctor, getDashboardData,adminLogin, allDoctors, allAppointments, cancelAppointment } from '../controllers/admin.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';


const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin , addDoctor)
adminRouter.post('/login', adminLogin)
adminRouter.get('/alldoctors',  allDoctors)
adminRouter.post('/chageAvalibilty', changeAvailablity)
adminRouter.get('/allappointments', allAppointments)
adminRouter.post('/cancelappointment', cancelAppointment)
adminRouter.get('/dashboard',  getDashboardData)
export default adminRouter;