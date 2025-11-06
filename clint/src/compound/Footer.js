import React from 'react'

import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  my-10 mb-40 text-sm'>
            <div>
                <img src={assets.logo} alt='' className='mb-5 w-32'/>
                <p>"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled</p>
            </div>

<div>
    <p className='text-xl font-medium mb-5'>COMPANY </p>
    <ul className='flex flex-col gap-1 text-gray-600'>
      <li>HOME</li>
      <li>About US</li>
      <li>Delivery</li>
      <li>Privacy police</li>
        
    </ul>
</div>

<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH </p>
    <ul className='flex flex-col gap-1 text-gray-600'>
      <li>+918859439434</li>
      <li>Forever@gmail.com</li>
     
        
    </ul>
</div>

        </div>
        <dvi>
          <hr/>
  <p className='py-5 text-sm text-center'>Copyrigth 2025@Forever.com - All Rigth Rest</p>
</dvi>
      
    </div>
  )
}

export default Footer
