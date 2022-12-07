const express = require('express');
const {
	addCart,
	deleteCart,
	getProducts,
	addProductToCart,
	deleteProduct
} = require('../controllers/cart.js');

const routerCart = express.Router();

routerCart.post('/', addCart);
routerCart.delete('/:id', deleteCart);
routerCart.get('/:id/productos', getProducts);
routerCart.post('/:id/productos', addProductToCart);
routerCart.delete('/:id/productos/:id_prod', deleteProduct);

module.exports = routerCart;