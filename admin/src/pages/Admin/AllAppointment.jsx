import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assest/assets_admin/assets'
import axios from 'axios'


const AllAppointment = () => {
  const {atoken,backendUrl, setAppointment, appointment, getAllappointment} = useContext(AdminContext)
  const {calculateAge} = useContext(AppContext)
  const handleCancelAppointment = async (appointmentId) => {
    // console.log("appointmentId",appointmentId)
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/cancelappointment", { appointmentId });
      console.log("data of cancel", data)
      if (data?.success) {
        getAllappointment()
        // setAppointment(appointment.filter((appointment) => appointment._id !== appointmentId));
        // toast.success(data.message)
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      // toast.error(error?.response?.data?.message || "Failed to cancel appointment.");
    }
  }

  useEffect(()=>{
    if(atoken){
      getAllappointment()
    }
  },[atoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr] grid-flow-col px-6 py-3 border-b  '>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointment.map((item, index)=>{
            return(
              <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-300' key={index}>
                <p>{index+1}</p>
                <div className='flex items-center gap-2'>
                  <img  className='w-8 rounded-full ' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                </div>
                <p>{calculateAge(item.userData.dob)}</p>
                <p>{item.date.slice(0,10)}, {item.time}</p>
                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
                </div>
                <p>{item.amount}$</p>
              
                {
                item.cancelled ?
                <p className='text-red-500 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p>:<img onClick={()=>handleCancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
              </div>
             
            )
          })
        }
      </div>
    </div>
  )
}

export default AllAppointment
