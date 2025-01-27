import React, { useContext } from 'react'
import { useState } from 'react'
import { assets } from '../../assest/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docImg, setDocImg] =useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1')
    const [speciality, setSpeciality] = useState('')
    const [fees, setFees] = useState('')
    const [degree, setDegree] = useState('')
    const [address, setAddress] = useState('')
    const [about, setAbout] = useState('')

    const { backendUrl, atoken} = useContext(AdminContext)

    const onSubminHandler = async (e) => {
        e.preventDefault()
        try {
            if(!docImg){
                return toast.error("please upload image")
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', Number(experience))
            formData.append('speciality', speciality)
            formData.append('fees', Number(fees))
            formData.append('degree', degree)
            formData.append('address', address)
            formData.append('about', about)

            // formData.forEach((value,key)=>{
            //     console.log(`${key} : ${value}`)
            // })
            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor', formData , {
                headers:{atoken}
            })
            if(!data.success){
                toast.success(data.message)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('')
                setSpeciality('')
                setFees('')
                setDegree('')
                setAddress('')
                setAbout('')
                setDocImg(false)
            }else{
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form onSubmit={onSubminHandler} className='m-5 w-full'>
         <p className='mb-3 text-xl font-medium'>Add Doctor</p>
        <div className='bg-white p-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
            <div className='flex items-center  gap-4 mb-8 text-gray-500'>
                <label htmlFor="doc-img">
                    <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=> setDocImg(e.target.files[0])} type="file" name="" id="doc-img" hidden />
                <p>Upload Doctor <br /> picture</p>
            </div>
            <div className='flex flex-col lg:flex-row items-center gap-10 text-gray-600'>
                <div className='w-full lg:flex-1 flex-col gap-4 '>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Name</p>
                        <input onChange={(e)=> setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text"  placeholder='name' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Email</p>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email"  placeholder='email' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Password</p>
                        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password"  placeholder='password' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Doctor Experince</p>
                        <input onChange={(e)=> setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' type="number"  placeholder='experience in years' required min={1} max={10}/>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Fees</p>
                        <input onChange={(e)=> setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
                    </div>

                </div>

                <div className='w-full lg:flex-1 flex- flex-col gap-4'>
                    <div className='flex-1 flex flex-col gap-1'>
                    <p>Doctor Speciality</p>
                    <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2'>
                        <option value="">Select Speciality</option>
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                      </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Education</p>
                        <input onChange={(e)=> setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text"  placeholder='education' required />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <p>Address</p>
                        <input onChange={(e)=> setAddress(e.target.value)} value={address} className='border rounded px-3 py-2' type="text"  placeholder='address' required />
                    </div>
                </div>
               
            </div>
            <div>
                    <p className='mt-4 mb-2 '>About Doctor</p>
                    <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' cols="30" rows="5" placeholder='about doctor'/>
                </div>
                <button type='submit' className='bg-primary text-white px-4 py-2 rounded-md text-base'>Add Doctor</button>
        </div>
    </form>
  )
}

export default AddDoctor
