import * as dotenv from 'dotenv';
dotenv.config()
import express, { urlencoded } from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;
const SESSION_SECRET = process.env.SESSION_SECRET || "mir4l0k3s34v3c1n4al4vu3lt4d3l43skin4";

app.use(express.json());
app.use(urlencoded({extended: true}));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions));

app.use(session({

    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 2
    }),

    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

initializePassport();
app.use(passport.initialize())
app.use(passport.session())

app.use('/', router);

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export function getIO() {
    return io;
}

const connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();