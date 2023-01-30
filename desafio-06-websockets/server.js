const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const fs = require('fs');
const { router, products } = require('./routes/router.js');

const app = express();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

app.use(express.static('views'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use('/', router);

io.on('connection', socket => {
	io.sockets.emit('products', products);

	fs.promises.readFile('db/chat.txt', 'utf-8').then(data => {
		io.sockets.emit('messages', JSON.parse(data));
	});

	socket.on('newProduct', newProduct => {
		products.push(newProduct);
		io.sockets.emit('products', products);
	});

	socket.on('newMessage', async newMessage => {
		let data = await fs.promises.readFile('db/chat.txt', 'utf-8');
		let messages = JSON.parse(data);
		messages.push(newMessage);
		fs.writeFileSync('db/chat.txt', JSON.stringify(messages));
		io.sockets.emit('messages', messages);
	});
});

const PORT = 8080;
const server = httpserver.listen(PORT, () =>
	console.log(`Server listening on port ${PORT}`)
);

server.on('error', () => console.log(`Error: ${err}`));