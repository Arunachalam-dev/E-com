import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from '../compound/Title'
import axios from 'axios'
import { data } from 'react-router-dom'
import { toast } from 'react-toastify'

const Order = () => {

  const { Backendurl, token, currency } = useContext(ShopContext)

  const [orderplacce, setorderplace] = useState([])


  const userorder = async () => {

    try {
      if (!token) {
        return null
      }

      const response = await axios.post(`${Backendurl}api/order/userorder`, {}, { headers: { token } })
      console.log(response.data)

      if (response.data.success) {
        let allprodect = []

        response.data.order.map((ord) => {
          ord.items.map((item) => {
            item['ststus'] = ord.ststus;
              item['paymentmethod'] = ord.paymentmethod;
              item['payment'] = ord.payment;
              item['date'] = ord.date;
            allprodect.push(item)
          })
        })
        setorderplace(allprodect.reverse()) 
        

      } 


    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }

  }

  useEffect(() => {
    userorder()
  }, [token

  ])



  return (
    <div className='border-t pt-10'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'Order'} />
      </div>
      <div></div>
      <div>
        {
          orderplacce.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image} alt='' />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-gray-700 text-base'>
                    <p >{currency}{item.price}</p>
                    <p>Quntity :{item.quantity}</p>
                    <p> Size : {item.size}</p> 
                  </div>
                  <p className='mt-1'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
<p className='mt-1'>payment : <span className='text-gray-400'>{item.paymentmethod}</span></p> 
                </div>



              </div>
              <div className='md:w-1/2  flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='bg-green-600 rounded-full min-w-2 h-2 '></p>
                   <p className='text-sm md:text-base'>{item.ststus}</p> 
                </div>
                <button onClick={userorder} className='border py-2 px-4  text-sm font-medium rounded-sm '>Track Order</button>

              </div>


            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Order
