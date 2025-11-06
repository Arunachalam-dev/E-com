import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext'
import { assets } from '../assets/assets'

import Title from "../compound/Title"

import Prodectitem from "../compound/Prodectitem"

const Colloction = () => {

  const { products, search, showSearch,currency } = useContext(ShopContext);
  const [showfilter, setshowfilter] = useState(false);
  const [fliterprodects, setfilterprodects] = useState([]);

  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);

  const [shortype, setshortype] = useState('relavent');

  let togelcategories = (e) => {


    if (categories.includes(e.target.value)) {
      setcategories(perv => perv.filter(item => item !== e.target.value))
    }
    else {
      setcategories(prev => [...prev, e.target.value])
    }
  }

  let togelsubcategories = (e) => {
    if (subcategories.includes(e.target.value)) {
      setsubcategories(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setsubcategories(prev => [...prev, e.target.value])
    }
  }


  const applyfilter = () => {

    let productscopy = products.slice();

    if (search && showSearch) {
      productscopy = productscopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (categories.length > 0) {

      productscopy = productscopy.filter(item => categories.includes(item.category));

    }

    if (subcategories.length > 0) {
      productscopy = productscopy.filter(item => subcategories.includes(item.subCategory));
    }

    setfilterprodects(productscopy)
  }



  const shortprodect = () => {
    let fbcopy = fliterprodects.slice();

    switch (shortype) {
      case 'low-high':
        setfilterprodects(fbcopy.sort((a, b) => (a.price - b.price)))
        break;

      case 'high-low':
        setfilterprodects(fbcopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyfilter();
        break;

    }
  }


  useEffect(() => {
    shortprodect();
  }, [shortype])

  useEffect(() => {
    applyfilter();
  }, [categories, subcategories, search, showSearch,products])


  // useEffect(() => {

  //   console.log(subcategories)
  // }, [subcategories])

  // useEffect(() => {
  //   setfilterprodects(products)
  // }, [products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t' >
      <div className='min-w-60'>
        <p onClick={() => (setshowfilter(!showfilter))} className='text-ls flex items-center my-2 cursor-pointer gap-2'>FILLTER
          <img className={`h-2 sm:hidden ${showfilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt='' />
        </p>

        <div className={`border  border-gray-300 pl-5 py-3  mt-5 ${showfilter ? " " : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium' >CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700 font-light' >
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Men"} onChange={togelcategories} />MEN
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Women"} onChange={togelcategories} />WOMEN
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Kids"} onChange={togelcategories} />Kids
            </p>


          </div>

        </div>
        <div className={`border  border-gray-300 pl-5 py-3  my-5 ${showfilter ? " " : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>SUB_CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700 font-light' >
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Topwear"} onChange={togelsubcategories} />TOP_WARE
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Bottomwear"} onChange={togelsubcategories} />BOTTEM_WARE
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={"Winterwear"} onChange={togelsubcategories} />WINTER_WARE
            </p>


          </div>
        </div>

      </div>

      <div className='flex-1'>
        <div className='flex justify-between gap-2 text-base sm:text-2xl mb-2 '>
          <Title text1={"All"} text2={"COLLACTION"} />

          <select onChange={(e) => setshortype(e.target.value)} className=' border-2 border-gray-300   text-sm px-2'>
            <option value={'relavent'}>Relavent</option>
            <option value={'low-high'}>Low-High</option>
            <option value={'high-low'}>High-Low</option>

          </select>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-3'>


          {
            fliterprodects.map((item, index) => (
              <Prodectitem key={index} id={item._id} name={item.name} price={`${currency} ${item.price}`} image={item.image} />
            ))
          }

        </div>

      </div>


    </div>
  )
}

export default Colloction
