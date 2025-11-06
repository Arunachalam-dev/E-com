import React from 'react'
import Title from '../compound/Title'
import Newsletter from '../compound/Newsletter'
import { assets } from '../assets/assets'

const Condect = () => {
  return (
    <div>
      <div className='text-center text-2xl border-t pt-10'>
        <Title text1={"CONDECT"} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt='' />
        <div className='flex flex-col justify-center items-start gap-6'>

          <p className='font-semibold text-xl text-gray-500'>Our store</p>
          <p className='text-gray-500'>NO 31A <br/>kumaru guru avnu neelagari</p>
          <p className='text-gray-500'>TEL: 044-8584-8458 <br/> Email: arun@gmail.com</p>
          <p className='font-semibold text-xl text-gray-500'>Creere at Forever</p>
          <p className='text-gray-600'>Learn more about out teams and jobs</p>

          <button className='  border-black text-sm border px-4 py-2 text-gray-500  hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>

        </div>


      </div>

      
<Newsletter/>
    </div>
  )
}

export default Condect
