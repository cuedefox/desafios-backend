import express, { urlencoded } from "express";
import router from "./routes/index.js";
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import http from 'http';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


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