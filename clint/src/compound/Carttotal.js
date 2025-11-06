import React, { useContext } from 'react'
import { ShopContext } from '../context/Shopcontext'
import Title from './Title'

const Carttotal = () => {

    const { currency, deliveryFee, getcarttotal } = useContext(ShopContext)
    return (
        <div className=' w-full'>
            <div className='text-2xl '>
                <Title text1={"Cart"} text2={"Total"} />

            </div>
            <div className=' flex flex-col gap-2 mt-2 text-sm '>
                <div className=' flex justify-between'>
                    <p>Subtotal</p>

                    <p>{currency}{getcarttotal()}.00</p>
                </div>
                <hr />

                <div className='flex justify-between'>
                    <p>Shpping_fee</p>
                    <p>{currency}{deliveryFee}.00</p>


                </div>
                <hr />
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>{currency}{getcarttotal() === 0 ? 0 : getcarttotal() + deliveryFee}.00</p>


                </div>





            </div>

        </div>
    )
}

export default Carttotal
