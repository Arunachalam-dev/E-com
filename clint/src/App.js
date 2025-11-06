import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../src/page/Home'
import Cart from '../src/page/Cart'
import About from '../src/page/About'
import Colloction from '../src/page/Colloction'
import Condect from '../src/page/Condect'
import Login from '../src/page/Login'
import Order from '../src/page/Order'
import Oredeplace from '../src/page/Oredeplace'
import Prodect from '../src/page/prodect'
import Navebar from './compound/Navebar/Navebar'
import Footer from './compound/Footer'
import Search from './compound/Search'

import Verify from './page/verify'

 

  import { ToastContainer, toast } from 'react-toastify';



const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
  <Navebar/>  
  <Search/>  
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/collection' element={<Colloction/>} />
  <Route path='/Cart' element={<Cart/>} />
  <Route path='/Order' element={<Order/>} />
  <Route path='/Orderplace' element={<Oredeplace/>} />
  <Route path='/Login' element={<Login/>} />
  <Route path='/About' element={<About/>} />
  <Route path='/Condect' element={<Condect/>} />
  <Route path='/verify' element={<Verify/>} />
  <Route path='/Prodect/:ProdectId' element={<Prodect/>} />

  

</Routes>
<Footer/>

    </div>
  )
}

export default App
