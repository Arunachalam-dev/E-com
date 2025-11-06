import React, { useState } from 'react'
import { assets } from '../admin_assets/assets'
import { backendurl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)

  const [name, setname] = useState('')
  const [Description, setDescription] = useState('')
  const [category, setcategory] = useState('Men')
  const [Sub_category, setSub_category] = useState('Top_ware')
  const [Price, setPrice] = useState('')
  const [Size, setSize] = useState([])
  const [bestseller, setbestseller] = useState(false)

  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const formdata = new FormData()

      formdata.append('name', name)
      formdata.append('Description', Description)
      formdata.append('category', category)
      formdata.append('Sub_category', Sub_category)
      formdata.append('Price', Price)
      formdata.append('Size', JSON.stringify(Size))
      formdata.append('bestseller', bestseller)

      image1 && formdata.append('image1', image1)
      image2 && formdata.append('image2', image2)
      image3 && formdata.append('image3', image3)
      image4 && formdata.append('image4', image4)

      // FIXED: Proper axios headers configuration
      const responce = await axios.post(`${backendurl}api/prodect/add`, formdata, {
        headers: {
          'token': token,
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(responce.data)

      // Reset form after success
      if (responce.data.success) {
        setname('')
        setDescription('')
        setPrice('')
        setSize([])
        setbestseller(false)
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
        toast.success('Product added successfully!')
      }

    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      toast.error('Error adding product: ' + (error.response?.data?.message || error.message))
    }
  }

  return (
    <form onSubmit={handlesubmit} className='flex flex-col w-full items-start gap-3'>
      <div >
        <p className='mb-2'>Uplord Image</p>

        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt='' />
            <input type='file' id='image1' hidden onChange={(e) => setimage1(e.target.files[0])} />
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt='' />
            <input type='file' id='image2' hidden onChange={(e) => setimage2(e.target.files[0])} />
          </label>
          <label className='w-20' htmlFor='image3'>
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt='' />
            <input type='file' id='image3' hidden onChange={(e) => setimage3(e.target.files[0])} />
          </label>
          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt='' />
            <input type='file' id='image4' hidden onChange={(e) => setimage4(e.target.files[0])} />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Prodect Name</p>
        <input onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Prodect name' required />
      </div>
      <div className='w-full' >
        <p className='mb-2'>Prodect Describstion</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={Description} className='w-full max-w-[500px] px-3 py-2' type='text-' placeholder='write your text' required />
      </div>
      <div className='flex flex-col  gap-2 w-full sm:gap-8 sm:flex-row '>
        <div >
          <p className='mb-2' >Prodect category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setcategory(e.target.value)}>
            <option value={'Men'} >Men</option>
            <option value={'Women'} >Women</option>
            <option value={'Kids'} >Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2' >Sub_category</p>
          <select className='w-full px-3 py-2' onChange={(e) => setSub_category(e.target.value)} >
            <option value={'Top_ware'} >Top_ware</option>
            <option value={'Bottum_ware'} >Bottum_ware</option>
            <option value={'Winter_ware'} >Winter_ware</option>
          </select>
        </div>

        <div>
          <p className='mb-2' >Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={Price} className='px-3 py-2 w-full sm:w-[120px]' type='Number' placeholder='$20' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Prodect Size</p>
        <div className='flex gap-2'>
          <div onClick={() => setSize(pre => pre.includes("S") ? pre.filter(item => item !== "S") : [...pre, "S"])}>
            <p className={`${Size.includes("S") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`} >S</p>
          </div>

          <div onClick={() => setSize(pre => pre.includes("M") ? pre.filter(item => item !== "M") : [...pre, "M"])}>
            <p className={`${Size.includes("M") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`} >M</p>
          </div>

          <div onClick={() => setSize(pre => pre.includes("L") ? pre.filter(item => item !== "L") : [...pre, "L"])}>
            <p className={`${Size.includes("L") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`} >L</p>
          </div>

          <div onClick={() => setSize(pre => pre.includes("XL") ? pre.filter(item => item !== "XL") : [...pre, "XL"])}>
            <p className={`${Size.includes("XL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`} >XL</p>
          </div>
          <div onClick={() => setSize(pre => pre.includes("XXL") ? pre.filter(item => item !== "XXL") : [...pre, "XXL"])}>
            <p className={`${Size.includes("XXL") ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`} >XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={(e) => setbestseller(pre => !pre)} checked={bestseller} type='checkbox' id='bestseller' />
        <label className='cursor-pointer ' htmlFor='bestseller'>Add to bestseller</label>
      </div>

      <button type='submit' className='bg-black text-white w-28 mt-4 py-3'>Add</button>
    </form>
  )
}

export default Add