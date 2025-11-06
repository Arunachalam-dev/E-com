import express from 'express'

import { aidmenlogin, loginuser, registeruser } from '../controls/usercontroller.js'


const userrouter = express.Router();

userrouter.post('/login', loginuser)
userrouter.post('/register', registeruser)

userrouter.post('/aidmen', aidmenlogin)


export default userrouter;



