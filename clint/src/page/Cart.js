import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext';
import Title from '../compound/Title';
import { assets } from '../assets/assets';
import Carttotal from '../compound/Carttotal';

const Cart = () => {
  const { products, currency, cartItems, updatequantity, nagivate } = useContext(ShopContext);
  const [carddata, setcarddata] = useState([]);


  useEffect(() => {

    if (products.length > 0) {
      let tempdata = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {

          if (cartItems[items][item] > 0) {
            tempdata.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })

          }

        }
      }
      setcarddata(tempdata)

    }





  }, [cartItems, products])
  return (
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-4 '>
        <Title text1={'YOUR'} text2={'CART'} />

      </div>
      <div>

      </div>
      <div>
        {
          carddata.map((item, index) => {
            const prodectdata = products.find((product) => product._id === item._id);

// *** FIX APPLIED HERE ***
                // Skip rendering if the product data is not found (is undefined)
                if (!prodectdata) {
                    return null; 
                }
                // *** END FIX ***

            return (
              <div key={index} className='py-4 border-t border-b text-gray-700  grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_o.5fr] items-center gap-4'>
                <div className=' flex items-start gap-6' >
                  <img className='w-16 sm:w-20 ' src={prodectdata.image} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium '>{prodectdata.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{prodectdata.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>


                <input 
    onChange={(e) => {
        const value = e.target.value;
        if (value === '' || value === '0') return;
        updatequantity(item._id, item.size, Number(value))
    }}
    onBlur={(e) => {
        if (e.target.value === '' || e.target.value === '0') {
            updatequantity(item._id, item.size, 0)
        }
    }}
    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
    type='number' 
    min={1} 
    value={item.quantity}
/>
                <img onClick={() => updatequantity(item._id, item.size, 0)} className='w-4 mr-4 cursor-pointer' src={assets.bin_icon} alt='' />
              </div>
            )


          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <Carttotal />
          <div className='w-full text-end'>
            <button onClick={() => nagivate('/Orderplace')} className='bg-black text-white py-2 px-2 mt-3'>Process To Checkout</button>

          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart
