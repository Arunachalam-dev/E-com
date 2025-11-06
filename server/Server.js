import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import Connectdb from './config/mongodb.js';
import cloudinarydb from './config/cloudinary.js';
import userrouter from './routs/userrouts.js';
import prodectrouter from './controls/prodectcontrol.js';

import cartrout from './routs/cartrouter.js';
import orderroute from './routs/orderrouts.js';

let app = express();
let port = process.env.PORT || 2020;


app.use(express.json())
app.use(cors())

Connectdb();
cloudinarydb();

app.use('/api/user', userrouter)

app.use('/api/prodect',prodectrouter)

app.use('/api/cart',cartrout)

app.use('/api/order',orderroute)

app.get('/', (req, res) => {
    res.send("i working")
})


app.listen(port, () => console.log('server redy on ' + port))