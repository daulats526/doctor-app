import { createContext } from "react"
import React from 'react'
// import { doctors } from "../assets/assets_frontend/assets"
import axios from 'axios'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [user, setUser] = useState(null)
    

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/alldoctors', {})
            if (data.success) {
                setDoctors(data.doctors)
                // console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const userData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/profile', {
                headers: {
                    token: token
                }
            })
            if (data.success) {
                console.log("userData",data?.user)
                setUser(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    //book appointment api



    const value = {
        doctors , token, setToken, backendUrl, user, userData, setUser, getDoctorsData
    }
    useEffect(() => {
        getDoctorsData()
    }, [])
    useEffect(() => {
        if (token) {
            userData()
        }else{
            setUser(null)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider


