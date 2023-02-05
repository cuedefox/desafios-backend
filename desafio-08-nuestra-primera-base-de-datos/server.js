const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const Container = require('./container.js');
const { optionsMariaDB, optionsSQLite3 } = require('./options/config.js');

const PORT = 8081;
const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const products = new Container(optionsMariaDB, 'products');
const messages = new Container(optionsSQLite3, 'messages');

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    res.render('form');
});

io.on('connection', async socket => {
    console.log('Conexión establecida');
    const dbProducts = await products.getAll();
    io.sockets.emit('products', dbProducts);
    const dbMessages = await messages.getAll();
    io.sockets.emit('messages', dbMessages);
    socket.on('product', async product => {
        products.save(product);
        const dbProducts = await products.getAll();
        io.sockets.emit('products', dbProducts);
    })
    socket.on('message', async message => {
        messages.save(message);
        const dbMessages = await messages.getAll();
        io.sockets.emit('messages', dbMessages);
    })
});

const server = httpserver.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', () => console.log(`Error: ${err}`));