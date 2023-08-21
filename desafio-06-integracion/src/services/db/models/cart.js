import mongoose from "mongoose";

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    products: Array
});


export const MODEL_CARTS = mongoose.model(collectionName, cartSchema);