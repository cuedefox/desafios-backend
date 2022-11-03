const express = require('express');
const contenedor = require('./contenedor');
const products = new contenedor('products.txt');
const app = express();

products.save({
    title: 'Amor',
    price: 685,
    thumbnail: 'www.urlfacherilla.com'
})