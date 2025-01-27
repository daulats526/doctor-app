import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import fileUpload from 'express-fileupload';
import userrouter from './routes/userRoute.js';
import paymentrouter from './routes/paymentRoute.js';
import doctorRoute from './routes/doctorRoute.js';

//app config

const app = express();
const port = process.env.PORT || 3000;
connectDB();

// middleware
app.use(cors());
app.use(express.json())
connectCloudinary()
app.use(fileUpload({
    useTempFiles: true, // Enables temporary file storage
    tempFileDir: '/tmp/', // Temporary file directory
}));

//api endpoint

app.use('/api/admin', adminRouter)
app.use('/api/user', userrouter)
app.use('/api/payment', paymentrouter)
app.use('/api/doctor', doctorRoute)

app.get('/', (req, res) => {
    res.send('Hello World! daulat s')
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    })