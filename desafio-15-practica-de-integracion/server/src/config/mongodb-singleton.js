import mongoose from 'mongoose';
import envConfig from "./env.config.js";
import { logger } from './logger_CUSTOM.js';

const MONGO_URI = envConfig.mongoUri;

export default class MongoSingleton {
    static #instance

    constructor() {
        this.#connectMongoDB()
    }

    static getIntance() {
        if (this.#instance) {
            logger.info("Ya se ha abierto una conxion a MongoDB");
        } else {
            this.#instance = new MongoSingleton()
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(MONGO_URI)
            logger.info("Conectado con exito a la DB");
        } catch (error) {
            logger.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit();
        }
    }
}