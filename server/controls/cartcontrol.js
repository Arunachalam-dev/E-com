import usermodel from "../models/usermodel.js"


const addtocart = async (req, res) => {

    try {
        const { userId, itemId, size } = req.body

         if (!size || size === "undefined") {
            return res.json({ success: false, message: "Invalid size" });
        }


        const userdate = await usermodel.findById(userId)
        let cardate = await userdate.cardate

        if (cardate[itemId]) {
            if (cardate[itemId][size]) {
                cardate[itemId][size] += 1
            }
            else {
                cardate[itemId][size] = 1
            }
        }
        else {
            cardate[itemId] = {}
            cardate[itemId][size] = 1
        }

        await usermodel.findByIdAndUpdate(userId, { cardate })
        res.json({ success: true, message: "Add card" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }




}
const updatetocart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body

        const userdate = await usermodel.findById(userId)
        let cardate = userdate.cardate
        cardate[itemId][size] = quantity

        await usermodel.findByIdAndUpdate(userId, { cardate })
        res.json({ success: true, message: "cart updated" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }



}
const getusercart = async (req, res) => {
    try {

        const { userId } = req.body
        const userdata = await usermodel.findById(userId)
        let cardate = userdata.cardate;
        res.json({ success: true, cardate })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { addtocart, updatetocart, getusercart }