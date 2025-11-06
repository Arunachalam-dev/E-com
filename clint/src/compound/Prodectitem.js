import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { Link } from 'react-router-dom'

const Prodectitem = ({id,name,price,image}) => {

    const{currncy}=useContext(ShopContext)

  return (
 <Link   className='  text-gray-500 cursor-pointer ' to={`/Prodect/${id}`} >
    <div className='overflow-hidden  '>
       <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt=''/>
       <p className='pt-3 pb-1 text-sm'>{name}</p>

       <p className='text-sm font-medium'>{currncy} {price} </p>

    </div>
 </Link>
  )
}

export default Prodectitem
