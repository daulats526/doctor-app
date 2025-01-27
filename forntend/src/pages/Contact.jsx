import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl uppercase pt-10 text-gray-500'>
        <p>CONTact <span className='text-gray-700 font-semibold'>us</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img src={assets.contact_image} alt="" className='w-full md:max-w-[360px]' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold uppercase text-lg text-gray-500'> our office</p>
          <p className='text-gray-500'>jaipur rajasthan india </p>
          <p className='text-gray-500'>000000000 <br />
          daulats526@gmail.com
          </p>
          <p className='font-semibold text-lg uppercase text-gray-600'>careers at PRESCRIPTO</p>
          <p className='text-gray-600'>learn more about</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore More</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
