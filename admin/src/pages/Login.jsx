import React, { useContext, useState } from 'react'
import { assets } from '../assest/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const { setAtoken, backendUrl } = useContext(AdminContext)
    const { setDtoken } = useContext(DoctorContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubminHandler = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('atoken', data.token)
                    setAtoken(data.token)
                }
                else {
                    toast.error('wrong email or password')
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/doclogin', { email, password })
                if (data.success) {
                    localStorage.setItem('dtoken', data.token)
                    setDtoken(data.token)
                    toast.success('login success')
                    console.log("doctoken", data.token)
                }
                else {
                    toast.error('wrong email or password')
                }

            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div>
            <form onSubmit={onSubminHandler} className='min-h-[80vh] flex items-center'>
                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-lg'>
                    <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span>Login</p>
                    <div className='w-full'>
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 w-full rounded p-2 mt-1' type="email" name="email" required />
                    </div>
                    <div className='w-full'>
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} className='border border-gray-300 w-full rounded p-2 mt-1' type="password" name="password" required />
                    </div>
                    <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
                    {
                        state === 'Admin' ?
                            <p className='text-sm text-gray-500 '>Doctor Login <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>click here</span></p> :
                            <p className='text-sm text-gray-500 '>Admin Login <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>click here</span></p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Login
