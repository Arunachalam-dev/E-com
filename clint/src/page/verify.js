import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const { nagivate, token, setcartItems,Backendurl } = useContext(ShopContext)

    const [searchparams, setsearchparams] = useSearchParams()

    const success = searchparams.get("success")
    const orderId = searchparams.get("orderId")

    const verifypayment = async () => {

if(!token){
    return null
}

try {

    const responce = await axios.post(`${Backendurl}api/order/verifystrip`,{success,orderId},{headers:{token}})
    
if(responce.data.success){
    setcartItems({})
    nagivate('/Order')
}
else{
 nagivate('/Cart')   
}


} catch (error) {
    console.log(error);
    toast.error(error.message)
    
    
}


    }


    useEffect(() => {
        verifypayment()
    }, [token])

    return (
        <div>

        </div>
    )
}

export default Verify
