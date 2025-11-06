
import usermodel from "../models/ordermodel.js"
import ordermodel from "../models/ordermodel.js"

import Strip from 'stripe'
import Razorpay from 'razorpay'

const currency = "inr"
const Delivery_fee = 10

const stripe = new Strip(process.env.Strip_Secret_key)

const rayzerpayinslice = new Razorpay({
    key_id: process.env.Rayzerpay_key_id,
    key_secret: process.env.Rayzerpay_key_secret,
})


const verifyRayzerpay=async(req,res)=>{
    try {

        const {userId,razorpay_order_id}=req.body


    const orderinfo= await rayzerpayinslice.orders.fetch(razorpay_order_id)
       
    if(orderinfo.status=="paid"){
        await ordermodel.findByIdAndUpdate(orderinfo.receipt,{payment:true})
        await usermodel.findByIdAndUpdate(userId,{cardate:{}})

        res.json({success:true,message:"payment successful"})
    }
    else{res.json({success:false,message:"payment faild"})

    }
    //razorpay_order_id:order_RbVpFpvRjS75bT

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

        
    }

}

// foe cod
const placeorder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        let orderdata = {
            userId, items, amount, address, paymentmethod: "COD"
            , payment: false, date: Date.now()
        }

        let neworder = new ordermodel(orderdata)

        await neworder.save()

        await usermodel.findByIdAndUpdate(userId, { cardate: {} })

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

// for stripe

const placeorderstrip = async (req, res) => {
    try {
        const { userId, address, items, amount } = req.body;
        const { origin } = req.headers;

        // Corrected Code: Added validation to ensure 'items' is an array.
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: "Order items list is required." });
        }

        const orderdata = {
            items, address, userId, amount, paymentmethod: 'strip', payment: false, date: Date.now()
        };

        const neworder = new ordermodel(orderdata);
        await neworder.save(); // Added 'await' for save operation

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Corrected section
        line_items.push({
            price_data: {
                currency: currency,
                // ✅ CORRECTED: Changed 'prodect_data' to 'product_data'
                product_data: {
                    name: "Deliver Charges"
                },
                unit_amount: Delivery_fee * 100
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${neworder._id}`,
            line_items,
            mode: "payment",
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//verifu

const verifystrip = async (req, res) => {
    const { userId, orderId, success } = req.body;
    try {

        if (success == "true") {
            await ordermodel.findByIdAndUpdate(orderId, { payment: true })
            await usermodel.findByIdAndUpdate(userId, { cardate: {} })

            res.json({ success: true });


        } else {
            await ordermodel.findByIdAndDelete(orderId)
            res.json({ success: false })

        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}



//for rayzerpay


const placeorderrayzerpay = async (req, res) => {

    try {

        const { userId, address, items, amount } = req.body;


        //Corrected Code: Added validation to ensure 'items' is an array.
        // if (!Array.isArray(items) || items.length === 0) {
        //     return res.status(400).json({ success: false, message: "Order items list is required." });
        // }

        const orderdata = {
            items, address, userId, amount, paymentmethod: 'razorpay', payment: false, date: Date.now()
        };

        const neworder = new ordermodel(orderdata);
        await neworder.save();

        const option = {
            amount: amount * 100,
            currency: currency.toLocaleUpperCase(),
            receipt: neworder._id.toString()
        }

        await rayzerpayinslice.orders.create(option, (erroe,order) => {

            if (erroe) {
                console.log(erroe);
                return res.json({ success: false, message: erroe })

            }

            res.json({ success: true, order })


        })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }


}

// for admin panal

const allorder = async (req, res) => {

    try {
        const orders = await ordermodel.find({})

        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }


}

//user order data for frontend
const userorder = async (req, res) => {
    try {
        const { userId } = req.body
        const order = await usermodel.find({ userId })

        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }




}

const updatestatus = async (req, res) => {

    try {
        const { orderId, ststus } = req.body
        await ordermodel.findByIdAndUpdate(orderId, { ststus })
        res.json({ success: true, message: "Stutes updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}

export { placeorder, verifystrip, verifyRayzerpay,placeorderrayzerpay, placeorderstrip, allorder, userorder, updatestatus }
