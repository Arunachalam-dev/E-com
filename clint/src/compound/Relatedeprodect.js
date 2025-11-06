import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/Shopcontext';
import Title from './Title';
import Prodectitem from './Prodectitem';

const Relatedeprodect = ({ categorys, subCategorys }) => {
      const { products } = useContext(ShopContext);

    const [related, setrelated] = useState([]);

  

    useEffect(() => {

        if (products.length > 0) {
            let prodectcopy = products.slice()

            prodectcopy = prodectcopy.filter((item) => categorys === item.category)
            prodectcopy = prodectcopy.filter((item) => subCategorys === item.subCategory)
            setrelated(prodectcopy.slice(0,5))
        }

    }, [products])
    return (
        <div className='my-20'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODECT"} />

            </div>
            <div className=' grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

                {
                    related.map((item, index) => (
                        <Prodectitem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                    ))
                }

            </div>

        </div>
    )
}

export default Relatedeprodect
