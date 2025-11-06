import { v2 as cloudinary } from 'cloudinary'
import prodectmodul from '../models/prodectmodle.js'

const addprodect = async (req, res) => {
  try {
    // Use the exact field names from frontend (capital letters)
    const { name, Description, Price, category, Sub_category, bestseller, Size } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const image = [image1, image2, image3, image4].filter((item) => item != undefined)

    let imageurl = await Promise.all(
      image.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
        return result.secure_url
      })
    )

    const prodectdata = {
      name, 
      description: Description, // Map Description to description
      price: Number(Price), // Map Price to price
      image: imageurl, 
      category, 
      subCategory: Sub_category, // Map Sub_category to subCategory
      sizes: JSON.parse(Size), // Map Size to sizes
      bestseller: bestseller === "true" ? true : false, 
      date: Date.now()
    }

    const prdect = new prodectmodul(prodectdata)
    await prdect.save()

    // Log the product data with correct field names
    console.log(name, Description, Price, category, Sub_category, bestseller, Size);

    res.status(201).json({ success: true, message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeprodect = async (req, res) => {
  try {
    await prodectmodul.findByIdAndDelete(req.body.id)
    res.json({success:true,massage:"prodect remove"})
  } catch (error) {
     console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const listprodect = async (req, res) => {
  try {
    const prodect= await prodectmodul.find({});
    res.json({success:true,prodect})
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
}

const singleprodect = async (req, res) => {
  try {
    const {prodectId}=req.body
    const prodect= await prodectmodul.findById(prodectId)
    res.json({success:true,prodect})
  } catch (error) {
     console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
}

export  {addprodect,removeprodect,listprodect,singleprodect}