
import usermodle from '../models/usermodel.js'
import validator from 'validator'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken';
// 

const createtocken = (id) => {
    return jwt.sign({ id }, process.env.jwt_secret)

}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await usermodle.findOne({ email })

        if (!user) {
            res.json({ success: false, massage: "user dosn't exit " })
        }

        const ismatch = await bcrypt.compare(password, user.password);

        if (ismatch) {

            const token = createtocken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, massage: "invalide user" })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, massage: error.massage })

    }
}

const registeruser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const exit = await usermodle.findOne({ email })

        if (exit) {
            return res.json({ success: false, message: 'email alredy exit' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Pleas enter validate email' })

        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Enter stong password' })
        }

        const salt = await bcrypt.genSalt(10)

        const hasingpassword = await bcrypt.hash(password, salt)

        const newuser = new usermodle({
            name, email, password: hasingpassword
        })

        const user = await newuser.save()

        const token = createtocken(user._id)

        res.json({ success: true, token })

    }
    catch (error) {
        console.log(console.error)
        res.json({ success: false, message: error.massage })
    }

}

const aidmenlogin = async (req, res) => {

    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.jwt_secret)
            res.json({ success: true, token })

        }
        else {

            res.json({ success: false, massage: "invalide cerdincal" })
        }

    } catch (error) {
        console.log(console.error)
        res.json({ success: false, message: error.massage })

    }




}

export { loginuser, registeruser, aidmenlogin }