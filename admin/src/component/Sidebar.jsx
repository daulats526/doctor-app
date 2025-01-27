import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assest/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {atoken} = useContext(AdminContext)
    const {dtoken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r'>
      {
        atoken && <ul className='text-gray-800 mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink >
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/allappointment'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointment</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/add-doctor'}>
                <img src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/doctorlist'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Doctor List</p>
            </NavLink>
        </ul>
      }
      {
        dtoken && <ul className='text-gray-800 mt-5'>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/doc-dash'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink >
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/doc-appoint'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointment</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-slate-100 border-r-4 border-primary':''}`} to={'/doc-profile'}>
                <img src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
