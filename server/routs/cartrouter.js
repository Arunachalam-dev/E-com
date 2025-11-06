import express from 'express'

import { addtocart, getusercart, updatetocart } from '../controls/cartcontrol.js'
import cartauth from '../middleware/cartauth.js'

const cartrout = express.Router()

cartrout.post('/update', cartauth, updatetocart)
cartrout.post('/add', cartauth, addtocart)
cartrout.post('/arun', cartauth, getusercart)


export default cartrout;