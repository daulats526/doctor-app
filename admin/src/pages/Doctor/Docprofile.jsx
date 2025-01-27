import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Docprofile = () => {
  const {profile, setProfile, getProfileData, dtoken, backendUrl} = useContext(DoctorContext)
  const [isEdit, setIsEdit] = useState(false)

  //update profile api
  const updateProfile = async (e) => {
    try {
      const updateData = {
        address: profile.address,
        fees: profile.fees,
        available: profile.available,
      }
      const {data} = await axios.put(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dtoken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log("error to get updatre profile", error)
    }
  }

  
  useEffect(()=>{
    if(dtoken){
      getProfileData()
    }
  },[dtoken])

  return profile && (
    <div>
      <div className=" flex flex-col gap-4 ">
        <div className="inline-block relative cursor-pointer">
          <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg" src={profile.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* docinfo */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profile.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profile.degree}-{profile.speciality}</p>
            <p className='py-0.5 border text-xs rounded-full '>{profile.experience}Years</p>
          </div>
          {/* doc about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-700 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 '>{profile.about}</p>
          </div>
          <p className='text-gray-600 font-medium mt-4'>Appointment Fees: <span className='text-gray-800'>${ isEdit? <input  className="bg-gray-100" type="number" onChange={(e)=>setProfile(prev => ({...prev, fees:e.target.value}))} value={profile.fees}/> :profile.fees}</span></p>
          <div>
            <div className='flex gap-2 py-2'>
              <p>Address</p>
              <p className='text-sm'>{ isEdit ? <input  className="bg-gray-100 w-48" type="text" onChange={(e)=>setProfile((prev)=>({...prev, address:e.target.value}))} value={profile.address}/> : profile.address}</p>
            </div>
            <div className='flex gap-1 pt-2 '>
             <input onChange={(e)=>setProfile((prev)=>({...prev, available:e.target.available}))} value={profile.available} checked={profile.available} type="checkbox" name="" id="" /><label htmlFor="">Available</label>
            </div>
            
            {
              isEdit ?  <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button> :
              <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Docprofile
