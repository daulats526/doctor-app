import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { data } from "react-router-dom";
import { toast } from "react-toastify";

export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dtoken, setDtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profile, setProfile] = useState(false)

    //get appointment api
    const getAppointmnet = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointment', {
                headers: { dtoken }
            })
            if (data.success) {
                setAppointments(data.appointments)
                // toast.success(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }
    //complete appointment api
    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/appointment-complete', { appointmentId }, { headers: { dtoken } });
            if (data.success) {

                toast.success(data.message)
                getAppointmnet()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }
    //cancel appintment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/appointment-cancel', { appointmentId }, { headers: { dtoken } });
            if (data.success) {

                toast.success(data.message)
                getAppointmnet()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }
    //get dashboard data api
    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', {
                headers: { dtoken }
            });
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }
    //get profiledata
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/profile', {
                headers: { dtoken }
            });
            if (data.success) {
                setProfile(data.docData)
                // console.log("profile", profile )
            } else {
                toast.error(data.message)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }
    const value = {
        dtoken, setDtoken, backendUrl, getAppointmnet, appointments, setAppointments, completeAppointment, cancelAppointment,
        getDashboardData, dashData, setDashData, profile, setProfile, getProfileData
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;