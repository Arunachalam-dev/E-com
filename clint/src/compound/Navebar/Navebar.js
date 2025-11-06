import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { assets } from '../../assets/assets'
import { ShopContext } from '../../context/Shopcontext'

const Navebar = () => {

    let [visible,setvisible]=useState(false)

    const{setShowSearch,getcartcount,nagivate,token,settoken}=useContext(ShopContext)

const logout=()=>{
    nagivate('/Login')
   localStorage.removeItem('token')
   
    settoken('') 

}

    return (
        <div className='flex item-cente  justify-between py-5 font-medium'>
          <Link to={'/'}>
          <img  src={assets.logo} className='w-36' alt='' /></Link> 

            <ul className='hidden sm:flex gap-5 text-sm text-red-700'>
                <NavLink to='/' className='flxe flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-700 hidden' />
                </NavLink>
                <NavLink to={'/collection'} className='flxe flex-col items-center gap-1'>
                    <p>Colloction</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-700 hidden' />
                </NavLink>
                <NavLink to={'/Condect'} className='flxe flex-col items-center gap-1'>
                    <p>Condect</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-700 hidden' />
                </NavLink>
                <NavLink to={'/About'} className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-red-700  hidden' />
                </NavLink>
            </ul>


            <div className='flex items-center gap-6'>
                <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt='' className='w-5 cursor-pointer' />

                <div className='group relative'>
              
                  <img onClick={()=> token ? null : nagivate('/Login')} src={assets.profile_icon} alt='' className='w-5 cursor-pointer' />
           {token&&
           <div className='group-hover:block hidden absolute dropdown-menu rigth-0 pt-4 '>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                    <p className=' cursor-pointer hover:text-black'>MY Profile</p>
                    <p onClick={()=>nagivate('/Order')} className=' cursor-pointer hover:text-black'>Order</p>
                    <p onClick={logout} className=' cursor-pointer hover:text-black'>Logout</p>
                </div>


                    </div>}
           
           

                </div>

                <Link to={"/Cart"} className=' relative '>
                <img src={assets.cart_icon} alt='' className='w-5 min-w-5'/>
                <p className=' absolute rigth-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full  text-[8px] '>{getcartcount()}</p>
                </Link>

                <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt=''/>

            </div>

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0' }`}>

<div className=' flex flex-col text-gray-600'>
    <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3'>

        <img className='h-4 ' src={ assets.dropdown_icon} alt=''/>
<p>
    Back
</p>
    </div>
    <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to={'/'}>Home</NavLink>
    <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border'  to={'/collection'}>COLLACTION</NavLink>
    <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border'to={'/Condect'}>Condect</NavLink>
    <NavLink  onClick={()=>setvisible(false)} className='py-2 pl-6 border'to={'/About'}>About</NavLink>
    
<NavLink className={'py'}></NavLink>
</div >
            </div>


        </div>
    )
}

export default Navebar
