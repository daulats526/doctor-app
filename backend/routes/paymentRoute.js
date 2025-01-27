import {payment, paymentVerify} from '../controllers/Payment.js'
import authUser from '../middlewares/authUser.js'
import express from 'express'

const paymentrouter = express.Router()

paymentrouter.post('/payment',authUser, payment)
paymentrouter.post('/paymentVerify', paymentVerify)

export default paymentrouter;