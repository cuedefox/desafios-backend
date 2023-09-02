import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    role: String,
    age: Number,
    password: String
})

export const MODEL_USER = mongoose.model(collection, schema);