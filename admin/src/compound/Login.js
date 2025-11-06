import React, { useState } from 'react'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'


const Login = ({settoken}) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

   const onsubmithandler = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${backendurl}api/user/aidmen`, { email, password });
    
    if (response.data.success) {
      settoken(response.data.token);
      toast.success('Login successful!');
    } else {
      toast.error(response.data.message || 'Login failed');
    }

  } catch (error) {
    console.error('Error during submission:', error);
    toast.error(error.response?.data?.message || error.message || 'Something went wrong');
  }
}


    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md px-8 py-6 rounded-lg max-w-md '>
                <h1 className=' text-2xl  text-center font-bold mb-4'>Admin Panal</h1>
                <form onSubmit={onsubmithandler}>
                    <div className='md-3 min-w-72'>
                        <p className='text-sm font-medium mb-2 text-gray-700'>Email Addres</p>
                        <input onChange={(e) => setemail(e.target.value)} value={ email} className='roundde-md  w-full px-3 py-2 border mb-2 border-gray-300 outline-none ' type='email'  placeholder='Enter your Email'  required/>
                    </div>
                    <div className='md-3 min-w-72'>
                        <p className='text-sm font-medium mb-2 text-gray-700'>Password</p>
                        <input onChange={(e) => setpassword(e.target.value)} value={ password} className='roundde-md w-full px-3 py-2 border mb-2 border-gray-300 outline-none ' type='password'  placeholder='Enter your password'  required/>
                    </div>
                    <button className='bg-black text-white px-3 py-2 mt-2 rounded w-full '>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
