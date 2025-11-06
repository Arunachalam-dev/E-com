import React, { useEffect, useState } from 'react'
import Navebar from './compound/Navebar'
import Sidebar from './compound/Sidebar'
import { Routes, Route } from 'react-router-dom'

import Add from './page/Add'
import List from './page/List'
import Order from './page/Order'
import Login from './compound/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const backendurl = 'http://localhost:2020/'

export const currency='$'
const App = () => {

  const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  return (

    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />

      {token === "" ? <Login settoken={settoken} /> : <>
        <Navebar settoken={settoken} />
        <hr />

        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
            <Routes>

              <Route path='/add' element={<Add token={token} />} />
              <Route path='/list' element={<List token={token} />} />
              <Route path='/order' element={<Order token={token} />} />
            </Routes>


          </div>
        </div>
      </>}



    </div>

  )
}

export default App
