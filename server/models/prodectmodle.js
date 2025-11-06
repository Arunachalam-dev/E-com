import mongoose from "mongoose";

const prodectschema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },   // Array of strings
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },   // Array of strings
    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true }
});

const prodectmodel = mongoose.models.prodect || mongoose.model("prodect", prodectschema);

export default prodectmodel;
