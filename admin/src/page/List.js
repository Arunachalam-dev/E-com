import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendurl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setlist] = useState([])

  const fatchlist = async () => {


    try {
      const responce = await axios.get(`${backendurl}api/prodect/list`)
     console.log(responce.data);
     
      if (responce.data.success) {
        setlist(responce.data.prodect
)


      }
      else {
        toast.error(responce.data.massage)
      }

    }
    catch (error) {
      toast.error(error.massage)

    }




  }

  const removeprodect= async(id)=>{



try {
  
    const responce= await axios.post(`${backendurl}api/prodect/remove`,{id},{headers:{token}})
    if(responce.data.success){
        
    toast.success(responce.data.massage)
    await fatchlist()

    }

    else{
  toast.error(responce.data.massage)
}
  
} catch (error) {
  toast.error(error.massage)
}
    
  }


  useEffect(() => {
    fatchlist()
  }, [])

  return (
    <>
      <p className='mb-2'>All Prodect List</p>
      <div className='flex flex-col  gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>


        { list.map((item,index) => (
          <div className='grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12 h-12 object-cover rounded' src={item.image[0]} alt='' />
            <p className='truncate'>{item.name}</p>
            <p className='hidden md:block'>{item.category}</p>
            <p className='hidden md:block'>{currency}{item.price}</p>
            <p onClick={()=>removeprodect(item._id)} className='text-right md:text-center cursor-pointer text-lg'>x</p>

          </div>
        ))}

      </div>

 

    </>
  )
}

export default List
