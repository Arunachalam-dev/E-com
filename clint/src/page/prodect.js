import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets';
import Relatedeprodect from '../compound/Relatedeprodect';

const Prodect = () => {

  const { ProdectId } = useParams();
  const { products, currency,Addtocart } = useContext(ShopContext);
  const [prodectdata, setprodectdata] = useState(false)
  const [image, setimage] = useState('')
  const [sizes, setsize] = useState('')


  let fatchprodect = async () => {

    products.map((item) => {
      if (item._id === ProdectId) {
        setprodectdata(item)
        setimage(item.image[0])


        return null
      }
    })

  }

  useEffect(() => {
    fatchprodect();
  }, [ProdectId])

  return prodectdata ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-100 opacity-100'>
      <div className=' flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        <div className=' flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className=' flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              prodectdata.image.map((item, index) => (
                <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt='' />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className=' w-full h-auto' alt='' />

          </div>


        </div>
        <div className='flex-1'>
          <h1 className='font-medium text-2xl  mt-2 '>{prodectdata.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt='' className="w-3.5" />
            <img src={assets.star_icon} alt='' className="w-3.5" />
            <img src={assets.star_icon} alt='' className="w-3.5" />
            <img src={assets.star_icon} alt='' className="w-3.5" />
            <img src={assets.star_dull_icon} alt='' className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div >
          <p className='font-medium text-3xl mt-2'>{currency} {prodectdata.price}</p>
          <p className='pt-5  text-gray-500 font-medium  md:w-4/5'>{prodectdata.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className=' flex gap-2'>
              {
                prodectdata.sizes.map((item, index) => (
                  <button onClick={() => setsize(item)} className={`border py-1 px-3 bg-gray-300 ${item === sizes ? "border-orange-600" : " "}`} key={index}>{item}</button>
                ))
              }

            </div>

          </div>
          <button onClick={()=>Addtocart(prodectdata._id,sizes)} className='bg-black text-white px-8 py-4 text-sm active:bg-gray-700'>ADD TO CART</button>

          <hr className='mt-8 sm:w-4/5' />
          <div className=' flex flex-col text-base text-gray-500 mt-5'>
            <p>100% Original prodect</p>
            <p>Cash On delivery is available on this prodect</p>
            <p>Easy Return and Exchange policy within 7 days.</p>
          </div>
        </div>



      </div>


    <div className='mt-20 '>
      <div className='flex'>
       <p className='border px-5 py-4 text-sm'>Description</p>
       <p className='border px-5 py-4 text-sm'>Reviwes (122)</p>

      </div>
<div className=' flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
<p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. </p>
<p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate </p>
</div>
    </div>
<Relatedeprodect categorys={prodectdata.category} subCategorys={prodectdata.subCategory}/>
    </div>
    
  ) : <div className='opacity-0'>

  </div>
}

export default Prodect
