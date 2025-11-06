import express from 'express'

import { allorder, placeorder, placeorderrayzerpay, placeorderstrip, updatestatus, userorder,verifyRayzerpay,verifystrip } from '../controls/ordercontroler.js'
import cartauth from '../middleware/cartauth.js'
import adminauth from '../middleware/adminauth.js'

const orderroute = express.Router()


// admin panal

orderroute.post('/allorde', adminauth, allorder)
orderroute.post('/status', adminauth, updatestatus)

// paymen getway

orderroute.post('/COD', cartauth, placeorder)
orderroute.post('/strip', cartauth, placeorderstrip)

orderroute.post('/verifystrip',cartauth,verifystrip)
orderroute.post('/rayzer', cartauth, placeorderrayzerpay)

orderroute.post('/verifyRayzerpay',cartauth,verifyRayzerpay)
orderroute.post('/userorder', cartauth, userorder)


export default orderroute