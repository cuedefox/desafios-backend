const express = require('express');
const productsRouter = require('./routes/products.js');

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', productsRouter);

const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
);
server.on('error', err => console.log(`Error: ${err}`));