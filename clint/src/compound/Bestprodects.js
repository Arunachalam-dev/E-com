import React, { useContext, useEffect, useState } from 'react';
import { ShopContext} from '../context/Shopcontext';
import Title from '../compound/Title';
import Prodectitem from '../compound/Prodectitem';
const Bestprodects = () => {

  const {products}= useContext(ShopContext)

  const [Bestseller, setBestseller] = useState([]);

  useEffect(() => {

    let bestprodect = products.filter((item) => (item.bestseller))

    setBestseller(bestprodect.slice(0, 5))
  },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"BEST"} text2={'PRODECTS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
          On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
        </p>

      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-2'>
        {
          Bestseller.map((item, index) => (
            <Prodectitem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))
        }

      </div>
    </div>
  )
}

export default Bestprodects
