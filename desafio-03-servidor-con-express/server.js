const express = require('express');
const Contenedor = require('./contenedor');
const app = express();
const PORT = 8080;

const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
});

server.on('error', err => console.log(`error: ${err}`));

const products = new Contenedor('products.txt');

app.get('/productos', async (req, res) => {
    const productos = await products.getAll();
    res.send(productos);
});

app.get('/productoRandom', async (req, res) => {
    const productos = await products.getAll();
    let numeroRandom = Math.floor(Math.random() * productos.length);
    res.send(productos[numeroRandom]);
});