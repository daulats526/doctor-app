import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import Appointment from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js';
import razorpay from 'razorpay'

//payment constroller

const razorpayInstance = new razorpay({
    key_id: 'rzp_test_EZx2uUMw3YZlsF',
    key_secret: 'g5cVQ32Zf3azRuH8Dwj4PoNs'
    })

const payment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointment = await Appointment.findById(appointmentId)

        //create option for rozarpay
        const options = {
            amount: appointment.amount * 100, // amount is in paise
            currency: 'INR',
            receipt: appointmentId,
            payment_capture: 1
            }
            //create of an order
            const order = await razorpayInstance.orders.create(options)
            res.json({
                order,
                success:true,
                message: 'Payment created successfully'
            })


    } catch (error) {
        res.status(400).json({ success: false, message: 'Payment failed' })
    }
}
//payment verify
const paymentVerify = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: 'Payment ID is required' });
        }

        const payment = await razorpayInstance.payments.fetch(id);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found on Razorpay' });
        }

        if (!payment.captured && payment.status === 'authorized') {
            // Capture the payment
            try {
                await razorpayInstance.payments.capture(payment.id, payment.amount);
            } catch (captureError) {
                return res.status(500).json({
                    success: false,
                    message: 'Payment capture failed',
                    error: captureError.message || captureError,
                });
            }
        }

        if (payment.captured) {
            const appointment = await Appointment.findById(payment.receipt, { payment: true });

            if (!appointment) {
                return res.status(404).json({ success: false, message: 'Appointment not found' });
            }

            appointment.payment = true;
            await appointment.save();

            return res.json({ success: true, message: 'Payment verified and captured successfully' });
        } else {
            return res.json({
                success: false,
                message: 'Payment authorization incomplete or capture failed',
            });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return res.status(500).json({
            success: false,
            message: 'Payment verification failed',
            error: error.message || error,
        });
    }
};



export {payment, paymentVerify}