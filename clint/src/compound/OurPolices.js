import React from 'react'

import { assets } from '../assets/assets'

const OurPolices = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
      <div >
        <img src={assets.exchange_icon} alt='' className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Easy Exchange Polices</p>
        <p className='text-gray-400'>We offer hassle free exchange Polices</p>

      </div>
       <div >
        <img src={assets.quality_icon} alt='' className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>7 Day Return Police </p>
        <p className='text-gray-400'>We Provide 7 day free return Polices</p>

      </div>
       <div >
        <img src={assets.support_img} alt='' className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Best customer Support</p>
        <p className='text-gray-400'>We Provide 24/7 customer Support </p>

      </div>
    </div>
  )
}

export default OurPolices
