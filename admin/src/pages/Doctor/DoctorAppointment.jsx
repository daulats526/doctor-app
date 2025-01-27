import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assest/assets_admin/assets'

const DoctorAppointment = () => {
    const { dtoken, setDtoken, getAppointmnet, appointments, setAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext)
    const {calculateAge} = useContext(AppContext)
    useEffect(()=>{
        if(dtoken){
            getAppointmnet()
        }
    },[dtoken])
    console.log("appointments",appointments)
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
            <p>#</p>
            <p>patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
        </div>
        {
            appointments.reverse().map((appointment, index) => (
                <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-300' key={index}>
                    <p className='max-sm:hidden'>{index+1}</p>
                    <div className='flex items-center gap-2'>
                        <img className='w-8 rounded-full ' src={appointment.userData.image} alt="" />
                        <p>{appointment.userData.name}</p>
                    </div>
                    <div>
                        <p className='text-xs inline border border-primary px-2 rounded-full '>{appointment.payment ? 'Online': 'Cash'}</p>
                    </div>
                    <p>{calculateAge(appointment.userData.dob)}</p>
                    <p>{appointment.date.slice(0,10)}| {appointment.time}</p>
                    <p>{appointment.amount}$</p>
                    {
                        appointment.cancelled ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>: appointment.isCompleted ? <p className='text-green-500 text-sm font-medium'>Completed</p> :  <div className='flex items-center'>
                        <img onClick={()=>cancelAppointment(appointment._id)} className='w-8 rounded-full' src={assets.cancel_icon} alt="" /><img onClick={()=>completeAppointment(appointment._id)} className='w-8 rounded-full' src={assets.tick_icon} alt="" />
                    </div>
                    }
                  
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default DoctorAppointment
