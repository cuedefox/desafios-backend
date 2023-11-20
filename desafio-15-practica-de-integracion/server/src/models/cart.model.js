import mongoose from "mongoose";

const collectionName = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
            quantity: Number
        }
    ]
});

export const MODEL_CARTS = mongoose.model(collectionName, cartSchema);