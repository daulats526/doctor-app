import React, { useContext, useState } from 'react'
import { assets} from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    

    const [showMenu, setShoeMenu] = useState(false)
    const {token, setToken, user, setUser} = useContext(AppContext)
    const logout = () => {
      setToken(null)
      localStorage.removeItem('token')
      navigate('/')
      }

  return     (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400  '>
      <img onClick={()=>navigate('/')} src={assets.logo} alt=""  className='w-44 cursor-pointer '/>
      <ul  className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to={'/'}>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/doctors'}>
            <li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/about'}>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/contact'}>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <a href="https://doctor-app-six.vercel.app/" className='text-sm rounded-lg border border-primary py-1 px-3'>admin panal</a>
      </ul>
      
      <div className='flex items-center gap-5 '>
        {
            token ? <div className='flex items-center gap-2 cursor-pointer group relative '>
                {
                  user && <img src={user.image} alt="" className='w-8 rounded-full ' />
                }
                <img src={assets.dropdown_icon} alt="" className='w-2.5 ' />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 '>
                        <p onClick={()=>navigate('/profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                        <p onClick={()=>navigate('/myappointment')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block '>Create Account</button>
        }
       <img onClick={()=>setShoeMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
       {/* mobile menu */}
       <div className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all ${showMenu ? 'fixed   w-full' : 'h-0 w-0'}`}>
        <div className='flex items-center justify-between px-5 py-6'>
          <img className='w-36' src={assets.logo} alt="" />
          <img className='w-7' onClick={()=>setShoeMenu(false)} src={assets.cross_icon} alt="" />
        </div>
        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
          <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShoeMenu(false)} to={'/'}><li>Home</li></NavLink>
          <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShoeMenu(false)} to={'/doctors'}><li>Doctors</li></NavLink>
          <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShoeMenu(false)} to={'/about'}><li>About</li></NavLink>
          <NavLink className="px-4 py-2 rounded inline-block" onClick={()=>setShoeMenu(false)} to={'/contact'}><li>Contact</li></NavLink>
          <a href="https://doctor-app-six.vercel.app/" className='text-sm rounded-lg border border-primary px-4 py-2  inline-block'>admin panal</a>
          <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block '>Create Account</button>
          
        </ul>
       
       </div>
      </div>
    </div>
  )
}

export default Navbar
