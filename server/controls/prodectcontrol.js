import express from 'express';
import { addprodect, listprodect, removeprodect, singleprodect } from '../routs/prodectrouts.js';
import upload from '../middleware/mullter.js';
import adminauth from '../middleware/adminauth.js';
import { v2 as cloudinary } from 'cloudinary';

const prodectrouter = express.Router();

// Test route to check Cloudinary configuration
prodectrouter.get('/test-cloudinary', async (req, res) => {
  try {
    // Test Cloudinary configuration
    const result = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      { folder: 'test' }
    );
    
    res.json({
      success: true,
      message: 'Cloudinary is working correctly!',
      imageUrl: result.secure_url
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Cloudinary configuration error',
      error: error.message
    });
  }
});

// Your existing routes
prodectrouter.post(
  '/add',
  adminauth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addprodect
);

prodectrouter.post('/remove', adminauth, removeprodect);
prodectrouter.get('/list', listprodect);
prodectrouter.post('/single', singleprodect);

export default prodectrouter;