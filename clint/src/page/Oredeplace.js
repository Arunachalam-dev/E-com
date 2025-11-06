import React, { useContext, useState } from 'react'
import Title from '../compound/Title'
// import Cart from './Cart'
import Carttotal from '../compound/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

//import {  useNavigate} from 'react-router-dom';

const Oredeplace = () => {
  let [method, setmethod] = useState('cod')

  const { Backendurl, setcartItems, token, getcarttotal, deliveryFee, products, cartItems, nagivate } = useContext(ShopContext)

  const [formdata, setformdate] = useState({
    Fist_Name: "",
    Last_Name: ""
    , Email_ID: "",
    Street: "",
    City: "",
    State: "",
    Zip_code: "",
    Contey: "",
    Phone_NO: ""

  })


  const initpay = (order) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID
      , amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (responce) => {
        console.log(responce)
        try {

          const {data}=await axios.post(`${Backendurl}api/order/verifyRayzerpay`,responce,{headers:{token}})
          
if(data.success){
 
            nagivate('/Order')
             setcartItems({})
}

        } catch (error) {
          console.log(error);
          toast.error(error)
          
        }



      }


    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  // let navigate=useNavigate();

  const onchangehandler = async (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setformdate(data => ({ ...data, [name]: value }))


  }


  const onsubmithandlener = async (e) => {
    e.preventDefault()

    try {

      let orderitems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {

            const iteminfo = structuredClone(products.find(prodec => prodec._id === items))

            if (iteminfo) {
              iteminfo.size = item
              iteminfo.quantity = cartItems[items][item]

              orderitems.push(iteminfo)
            }



          }
        }
      }

      //  console.log(orderitems);

      let orderdata = {
        address: formdata,
        items: orderitems,
        amount: getcarttotal() + deliveryFee
      }

      switch (method) {
        case 'cod':
          const responce = await axios.post(`${Backendurl}api/order/COD`, orderdata, { headers: { token } })
          if (responce.data.success) {
            setcartItems({})
            nagivate('/Order')
            toast.success(responce.data.message)
          }
          else {
            toast.error(responce.data.message)
          }
          break;
        case "strip":

          const responcestrip = await axios.post(`${Backendurl}api/order/strip`, orderdata, { headers: { token } })

          if (responcestrip.data.success) {
            const { session_url } = responcestrip.data
            window.location.replace(session_url)

          }
          else {
            toast.error(responcestrip.data.message)
          }

          break;

        case 'razorpay':

          const responcerazorpay = await axios.post(`${Backendurl}api/order/rayzer`, orderdata, { headers: { token } })

          if (responcerazorpay.data.success) {

            initpay(responcerazorpay.data.order)


          }

          break;


        default:
          break;
      }



    } catch (error) {

    }

  }


  return (
    <form onSubmit={onsubmithandlener} className='flex flex-col sm:flex-row justify-between  gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className=' text-xl sm:text-2xl my-3'>
          <Title text1={'Delevery'} text2={'Info'} />

        </div>
        <div className='flex gap-3'>
          <input onChange={onchangehandler} name='Fist_Name' value={formdata.Fist_Name} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='text' placeholder='Fist_Name' />
          <input onChange={onchangehandler} name='Last_Name' value={formdata.Last_Name} className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='text' placeholder='Last_Name' />
        </div>
        <input onChange={onchangehandler} name='Email_ID' value={formdata.Email_ID} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='email' placeholder='Email_ID' />
        <input onChange={onchangehandler} name='Street' value={formdata.Street} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='text' placeholder=' Street ' />


        <div className='flex gap-3'>
          <input onChange={onchangehandler} name='City' value={formdata.City} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='text' placeholder='City' />
          <input onChange={onchangehandler} name='State' value={formdata.State} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='text' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input onChange={onchangehandler} name='Zip_code' value={formdata.Zip_code} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='Number' placeholder='Zip_code' />
          <input onChange={onchangehandler} name='Contey' value={formdata.Contey} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='text' placeholder='Contey' />
        </div>
        <input onChange={onchangehandler} name='Phone_NO' value={formdata.Phone_NO} required className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' type='number' placeholder=' Phone_NO ' />
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <Carttotal />

        </div>
        <div className='mt-12'>
          <Title text1={'Payment'} text2={'Method'} />

          <div className='flex flex-col gap-2 lg:flex-row'>
            <div onClick={() => setmethod('strip')} className='flex items-center gap-3  border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "strip" ? "bg-green-400" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt='' />

            </div>
            <div onClick={() => setmethod('razorpay')} className='flex items-center gap-3  border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt='' />

            </div>
            <div onClick={() => setmethod('cod')} className='flex items-center gap-3  border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delever</p>
            </div>

          </div>
          <div className='w-full text-end mt-5'>
            <button type='submit' className='bg-black text-white border py-3 px-10'>Place Order</button>

          </div>

        </div>



      </div>

    </form>
  )
}

export default Oredeplace
