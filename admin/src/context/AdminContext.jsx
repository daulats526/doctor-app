import { createContext } from "react";
import { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';

export const AdminContext = createContext()
const AdminContextProvider = (props) => {

    const [atoken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : '')
    const [Doctors, setDoctors] = useState([])
    const [appointment, setAppointment] = useState([])
    const [dashData, setDashData] = useState(false)


    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/alldoctors', {})
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/chageAvalibilty', { docId })
            if (data.success) {
                toast.success(data.message)
                console.log(data)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    const getAllappointment = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/allappointments', { headers: { atoken } })
            if (data.success) {
                console.log(data.appointments)
                setAppointment(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //get dashboard data api
    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard')
            if (data.success) {
                console.log(data)
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const value = {
        atoken, setAtoken, backendUrl, Doctors, getAllDoctors,
        changeAvailability, appointment, setAppointment, getAllappointment, dashData, setDashData, getDashData
    }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;