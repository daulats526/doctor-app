import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assest/assets_admin/assets'

const Dashbord = () => {
  const { atoken,dashData, setDashData, getDashData} = useContext(AdminContext)

  useEffect(()=>{
    if(atoken){
      getDashData()
      console.log("dashData",dashData)
    }
  },[atoken])
  return dashData  && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
       
      <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14 ' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400 '>Doctors</p>
          </div>
        </div>
        <div  className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14 ' src={assets.appointments_icon} alt="" />
          <div>
            <p  className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400 '>Appointment</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all '>
          <img className='w-14 ' src={assets.patients_icon} alt="" />
          <div>
            <p  className='text-xl font-semibold text-gray-600'>{dashData.users}</p>
            <p className='text-gray-400 '>Patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 p-4 mt-10 rounded-t border'>
          <img className='' src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt-4 border border-t-0 '>
          {
            dashData.latestAppointment && dashData.latestAppointment.map((item, index) => (
              <div key={index} className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200'>
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-6 00 '>{item.date.slice(0,10)} | {item.time}</p>
                  
                </div>
                </div>))
          }

        </div>
      </div>
    </div>
  )
}

export default Dashbord
