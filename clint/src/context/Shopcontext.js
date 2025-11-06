import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const deliveryFee = 20;
    const Backendurl = process.env.REACT_APP_BACKEND_URL
    // const Rayzerpay=process.env.REACT_APP_RAZORPAY_KEY_ID

    let nagivate = useNavigate()
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setproducts] = useState([]);
    const [token, settoken] = useState('')
    const [cartItems, setcartItems] = useState({})

    const Addtocart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size")
            return;
        }

        let updatedCart = JSON.parse(JSON.stringify(cartItems));
        
        if (updatedCart[itemId]) {
            if (updatedCart[itemId][size]) {
                updatedCart[itemId][size] += 1
            } else {
                updatedCart[itemId][size] = 1
            }
        } else {
            updatedCart[itemId] = {}
            updatedCart[itemId][size] = 1
        }

        setcartItems(updatedCart)
        
        if (token) {
            try {
                await axios.post(`${Backendurl}api/cart/add`, { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getcartcount = () => {
        let totalcount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalcount += cartItems[items][item]
                }
            }
        }
        return totalcount;
    }

    const updatequantity = async (itemId, size, quantity) => {
        let updatedCart = JSON.parse(JSON.stringify(cartItems));
        
        if (quantity === 0) {
            if (updatedCart[itemId] && updatedCart[itemId][size]) {
                delete updatedCart[itemId][size];
                if (Object.keys(updatedCart[itemId]).length === 0) {
                    delete updatedCart[itemId];
                }
            }
        } else {
            if (!updatedCart[itemId]) {
                updatedCart[itemId] = {};
            }
            updatedCart[itemId][size] = quantity;
        }
        
        setcartItems(updatedCart)

        if (token) {
            try {
                await axios.post(`${Backendurl}api/cart/update`, { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getcarttotal = () => {
        let totalcount = 0;
        for (const itemId in cartItems) {
            let productInfo = products.find((product) => product._id === itemId)
            if (productInfo) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        totalcount += productInfo.price * cartItems[itemId][size];
                    }
                }
            }
        }
        return totalcount
    }

    const getallproducts = async () => {
        try {
            const response = await axios.get(`${Backendurl}api/prodect/list`)
            if (response.data.success) {
                setproducts(response.data.prodect)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch products")
        }
    }

    const getusercart = async (userToken) => {
        try {
            const response = await axios.post(`${Backendurl}api/cart/arun`, {}, { headers: { token: userToken } })
            if (response.data.success) {
                // Clean any undefined keys from cart data
                const cleanedCart = {};
                for (const itemId in response.data.cardate) {
                    cleanedCart[itemId] = {};
                    for (const size in response.data.cardate[itemId]) {
                        if (size !== "undefined" && response.data.cardate[itemId][size] > 0) {
                            cleanedCart[itemId][size] = response.data.cardate[itemId][size];
                        }
                    }
                    if (Object.keys(cleanedCart[itemId]).length === 0) {
                        delete cleanedCart[itemId];
                    }
                }
                setcartItems(cleanedCart);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getallproducts()
    }, [])

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            settoken(userToken);
            getusercart(userToken);
        }
    }, [])

    const value = {
        products,
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        Addtocart,
        getcartcount,
        updatequantity,
        getcarttotal,
        nagivate,
        Backendurl, 
       
        token, 
        settoken,setcartItems
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;