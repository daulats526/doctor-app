import React, { useContext } from 'react'
import { assets } from '../assest/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {atoken , setAtoken} = useContext(AdminContext)
    const {dtoken, setDtoken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const handleLogout = () => {
       atoken && localStorage.removeItem('atoken')
       dtoken && localStorage.removeItem('dtoken')
       atoken && setAtoken('')
       dtoken && setDtoken('')
        navigate('/')
        window.location.reload()
        }
    return (
        <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white  ">
            <div className='flex items-center gap-2 text-xs'>
                <img className='w-36 cursor-pointer sm:w-40' src={assets.admin_logo} alt="" />
                <p className='border px-2.5 rounded-full border-gray-500 py-0.5'>{
                 atoken ? "Admin" : "Doctor"
                 }
                </p>
            </div>
            <button onClick={handleLogout}  className='bg-primary text-white text-sm px-10 py-2 rounded-full '>Logout</button>
        </div>
    )
}

export default Navbar
