import mongoose from 'mongoose';
import envConfig from "./env.config.js";

const MONGO_URI = envConfig.mongoUri;

export default class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getIntance() {
        if (this.#instance) {
            console.log("Ya se ha abierto una conxion a MongoDB");
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(MONGO_URI)
            console.log("Conectado con exito a la DB");
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
}