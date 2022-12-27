const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/controllerProducts.js");
const routerProducts = express.Router();

routerProducts.get('/:id?', getProducts);

routerProducts.post('/', addProduct);

routerProducts.put('/:id', updateProduct);

routerProducts.delete('/:id', deleteProduct);

module.exports = routerProducts;