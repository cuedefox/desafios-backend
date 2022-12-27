const express = require("express");
const { addCart, deleteCart, getProducts, addProduct, deleteProduct } = require("../controllers/controllerCarts.js");
const routerCarts = express.Router();

routerCarts.post('/', addCart);

routerCarts.delete('/:id', deleteCart);

routerCarts.get('/:id/products', getProducts);

routerCarts.post('/:id/products', addProduct);

routerCarts.delete('/:id/products/:id_prod', deleteProduct);

module.exports = routerCarts;