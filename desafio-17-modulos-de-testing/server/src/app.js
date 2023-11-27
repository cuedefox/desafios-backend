import express, { urlencoded } from "express";
import router from "./routes/index.js";
import MongoStore from "connect-mongo";
import http from 'http';
import { Server } from "socket.io";
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import envConfig from "./config/env.config.js";
import MongoSingleton from "./config/mongodb-singleton.js";
import compression from "express-compression";
import { addLogger, logger } from "./config/logger_CUSTOM.js";
import { swaggerSpecs } from "./swaggerSpecs.js";
import swaggerUi from 'swagger-ui-express';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = envConfig.port;
const MONGO_URI = envConfig.mongoUri;
const SESSION_SECRET = envConfig.sessionSecret;

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

app.use(compression());

app.use(addLogger);

app.use('/', router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

io.on('connection', socket => {
    logger.info('Nuevo cliente conectado');
    socket.on('disconnect', () => {
        logger.info('Un cliente se ha desconectado');
    });
});

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

export function getIO() {
    return io;
}

const connectMongoDB = async (req, res) => {
    try {
        await MongoSingleton.getIntance()
    } catch (error) {
        logger.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();