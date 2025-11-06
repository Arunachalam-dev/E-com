import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const { token, settoken, nagivate , Backendurl } = useContext(ShopContext);
  let [currentstate, setcurrentstate] = useState('Login')
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')

  let handlesubmit = async (e) => {
    e.preventDefault()

    try {
      if (currentstate === "Sing up") {
         const responce = await axios.post(`${Backendurl}api/user/register`, { name, password, email }) 
       console.log(responce.data);
       
        if (responce.data.success) {
          
          settoken(responce.data.token)
          localStorage.setItem('token', responce.data.token)
          toast.success(responce.data.massage)
          
         
        }
        else {
          toast.error(responce.data.massage)
        }

      } else {
        const responce = await axios.post(`${Backendurl}api/user/login`, { email, password })
        console.log(responce.data)

        if (responce.data.success) {
          settoken(responce.data.token)
          localStorage.setItem('token', responce.data.token)
          toast.success('Login success')
          nagivate ('/')
        }
        else {
          toast.error(responce.data.massage)
        }
      }

    } catch (error) {
      toast.error(error.massage)
    }

  }

  useEffect(() => {
    if(token){
     nagivate('/')
    }
  }, [token, nagivate ])

  return (
    <form onSubmit={handlesubmit} className='flex flex-col items-center gap-2 w-[90%] max-w-96 m-auto mt-14 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentstate === "Login" ? "" : <input onChange={(e) => setname(e.target.value)} value={name} type='text' placeholder='Name' className='w-full px-3 py-3 border border-gray-800' required />}
      <input onChange={(e) => setemail(e.target.value)} value={email} type='email' placeholder='Email' className='w-full px-3 py-3 border border-gray-800' required />
      <input onChange={(e) => setpassword(e.target.value)} value={password} type='password' placeholder='Password' className='w-full px-3 py-3 border border-gray-800' required />
      <div className='w-full flex justify-between text-sm mt-[-8] '>
        <p className='cursor-pointer '>Forgot Password ?</p>

        {
          currentstate === 'Login'
            ? <p onClick={() => setcurrentstate("Sing up")} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setcurrentstate("Login")} className='cursor-pointer'>Login Here</p>
        }

      </div>
      <button className='bg-black text-white px-4 py-2 border'>{currentstate === "Login" ? "Sing In" : "Sing Up"}</button>
    </form>
  )
}

export default Login