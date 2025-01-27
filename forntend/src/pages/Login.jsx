import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = React.useState('Sign up')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const navigate = useNavigate()
  const {token, setToken, backendUrl} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if(state === 'Sign up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success('Sign up successful')
          console.log("error while register user",error)
        }else{
          toast.error(data.message) 
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/login', {email,
          password})
          if (data.success) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            }else{
              toast.error(data.message)
              }
      }
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(
    () => {
      if (token) {
        navigate('/')  
        }
        },[token]
  )
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 sm:min-w-96 border rounded-xl text-gray-700 text-sm shadow-lg '>
          <p className='text-2xl font-semibold'>{state === 'Sign up' ? 'Create Account' : 'Login'}</p>
          <p>Please {state === 'Sign up' ? 'Sign Up' : 'Login'}  to Book an Appointment</p>
          {
            state === 'Sign up' ? 
              <div className='w-full'>
              <p>Full Name:</p>
              <input className='border border-gray-700 rounded w-full p-2 mt-1' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            : <div></div>
          }
         
          <div className='w-full'>
            <p>Email:</p>
            <input className='border border-gray-700 rounded w-full p-2 mt-1' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className='w-full'>
            <p>Password:</p>
            <input className='border border-gray-700 rounded w-full p-2 mt-1' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base '>{state === 'Sing up' ? 'Create Account' : 'Login'}</button>
          {
            state === 'Sign up' ? 
            <p className='text-gray-500 text-sm mt-2'>Already have an account? <span
            onClick={()=>setState('Login')}
             className='text-primary cursor-pointer underline'>Login here</span></p>
            : <p className='text-gray-500 text-sm mt-2'>Create an new account? <span
            onClick={()=>setState('Sign up')}
            className='text-primary cursor-pointer underline'>click Here</span></p>
            

          }
        </div>

      </form>
    </div>
  )
}

export default Login
