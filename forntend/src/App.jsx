import { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

import './App.css'
import { Routes,Route } from 'react-router-dom'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Myappoitment from './pages/Myappoitment'
import Appointment from './pages/Appointment'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/myappointment' element={<Myappoitment/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>

      </Routes>
      <Footer/>
     </div>
    </>
  )
}

export default App
