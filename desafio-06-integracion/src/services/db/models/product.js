import mongoose from "mongoose";

const collectionName = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number, 
    status: Boolean,
    code: String,
    stock: Number,
    category: String
});


export const MODEL_PRODUCTS = mongoose.model(collectionName, productSchema);