import React from 'react'
import Title from '../compound/Title'

import Newsletter from '../compound/Newsletter'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>

        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt='' />

        <div className='flex flex-col justify-center gap-6 md:w-2/3 text-gray-600'>

          <p>Product pages and their descriptions are the cornerstone of any good eCommerce store. The main reason why is pretty self-explanatory – it’s how potential customers learn about your products. </p>
          <p>while some brands think they can get away with a few stock images and copy lifted straight from the manufacturer’s website, your eCommerce content needs to be more than an afterthought. </p>
          <b className='text-gray-600'>Our Mission</b>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
        </div>

      </div>

      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={'US'}/>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
 <div className='flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5 border '>
  <b>Oulity Assurenc :</b>
<p className='text-gray-600'>while some brands think they can get away with a few stock images and copy lifted straight from the manufacturer’s website,</p>
      </div>
       <div className='flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5 border '>
  <b>Convanience:</b>
<p className='text-gray-600'>while some brands think they can get away with a few stock images and copy lifted straight from the manufacturer’s website,</p>
      </div>
       <div className='flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5 border '>
  <b>Expctional Coustemer Service:</b>
<p className='text-gray-600'>while some brands think they can get away with a few stock images and copy lifted straight from the manufacturer’s website,</p>
      </div>
      </div>
     
     
<Newsletter/>
    </div>
  )
}

export default About
