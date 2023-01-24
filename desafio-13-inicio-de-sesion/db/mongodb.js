import mongoose from 'mongoose'

export const init = async () => {
  try {
    const URL = process.env.MONGODB_URI
    mongoose.connect(URL)
    console.log('Database connected.')
  } catch (error) {
    console.error('Error connecting to database', error.message)
  }
}