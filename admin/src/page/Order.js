import React, { useEffect, useState } from 'react'

import { backendurl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../admin_assets/assets'
const Order = ({ token }) => {

  const [orders, setorders] = useState([])

  const futchallorder = async () => {

    if (!token) {
      return null
    }

    try {
      const responce = await axios.post(`${backendurl}api/order/allorde`, {}, { headers: { token } })

      console.log(responce.data);

      if (responce.data.success) {
        setorders(responce.data.orders.reverse())

      } else {
        toast.error(responce.data.message)

      }



    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }

  const statusupdate=async(event,orderId)=>{
    try {
      
const responce= await axios.post(`${backendurl}api/order/status`,{orderId,ststus:event.target.value},{headers:{token}})

if(responce.data.success){
  await futchallorder()
}

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }


  useEffect(() => {
    futchallorder()
  }, [token,futchallorder])

  return (
    <div>

      <h3>All Orders</h3>
      <div>
        {
          orders.map((ord, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm  text-gray-700' key={index}>
              <img  className='w-12' src={assets.parcel_icon} alt='' />
<div>
  
              <div>
                {
                  ord.items?.map((item, index) => {
                    if (index === ord.items.length - 1) {
                      return <p className='p-0.5' key={index}> {item.name}   x {item.quantity} x <span>{item.size}</span> </p>
                    }
                    else {
                      return <p className='p-0.5' key={index}> {item.name}   x {item.quantity} x <span>{item.size}</span> ,</p>

                    }
                  })
                }
              </div>
              <p className='mt-3 mb-2 font-medium'>{ord.address.Fist_Name + " " + ord.address.Last_Name
              }</p>
              <div>
                <p  >{ord.address.Street + ", "} </p>
                <p >{ord.address.City + ", "  +  ord.address.
                  State + ", " + ord.address.Contey
                  + ", " + ord.address.
                    Zip_code} </p>
              </div>
              <p>{ord.address.
Phone_NO}</p>

            </div>

            <div>
<p className='text-sm sm:text-[15px]'>items :  {ord.items.length} </p>
<p className='mt-3' >Method : {ord.
paymentmethod}</p>
<p>Payment: {ord.payment ? "Done" :"pending"}</p>
<p>Date : {new Date(ord.date).toLocaleDateString()}</p>

            </div>
            <p className=' text-sm sm:text-[15px]'>{currency} {ord.amount}</p>

            <select  onChange={(event)=>statusupdate(event,ord._id)} value={ord.ststus} className='p-2 font-semibold'>
              <option value='Order Placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Reday To Ship'>Reday To Ship</option>
              <option value='Shiped '>Shiped </option>
              <option value='Out For Delivery'>Out For Delivery</option>
              <option value='Delivery'>Delivery</option>
            </select>
</div>
          ))
        }

      </div>


    </div>
  )
}

export default Order

