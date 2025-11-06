import React, { useContext, useEffect, useState } from 'react'
import {ShopContext }from '../context/Shopcontext'
import Title from './Title'
import Prodectitem from './Prodectitem'

const Latestcollaction = () => {

    const {products}=useContext(ShopContext)
  const [Latestcollaction,SetLatestcollaction]=useState([]);


  useEffect(()=>{
SetLatestcollaction(products.slice(0,15))
  },[products])
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
 <Title text1={"Latest"} text2={"Collaction"} />
 <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit
 </p>
        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y'>
        {
            Latestcollaction.map((item,index)=>(
              <Prodectitem  className='' key={index} id={item._id} name={item.name} image={item.image} price={item.price} />  
            ))
        }
        </div>  
     
    </div>
  )
}

export default Latestcollaction
