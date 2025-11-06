import mongoose from "mongoose";


const Connectdb=async()=>{

  mongoose.connection.on('connected',()=>{
    console.log("DB connecte seccfully")
})

    await mongoose.connect(`${process.env.Mongo_url}/Ecoms`)
}

export default Connectdb;