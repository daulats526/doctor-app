import { useContext } from 'react';
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashbord from './pages/Admin/Dashbord';
import AllAppointment from './pages/Admin/AllAppointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DocDash from './pages/Doctor/DocDash';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import Docprofile from './pages/Doctor/Docprofile';

function App() {
    const {atoken} = useContext(AdminContext)
    const {dtoken} = useContext(DoctorContext)
    

  return atoken || dtoken ? (
    <div className='bg-yellow-50'>
          <ToastContainer />
          <Navbar/>
          <div className='flex items-start'>
            <Sidebar/>
            <Routes>
              {/* //admin routse */}
              <Route path='/' element={<></>} />
              <Route path='/dashboard' element={<Dashbord />} />
              <Route path='/allappointment' element={<AllAppointment/>}/>
              <Route path= '/add-doctor' element ={<AddDoctor/>}/>
              <Route path='/doctorlist' element = {<DoctorList/>}/>
                {/* doctor Route */}
                <Route path='/doc-dash' element={<DocDash/>}/>
                <Route path='/doc-appoint' element={<DoctorAppointment/>}/>
                <Route path='/doc-profile' element={<Docprofile/>}/>
            </Routes>
          </div>
    </div>
    ):
  (
    <>
    <Login/>
    <ToastContainer />
    </>
  )
}

export default App
