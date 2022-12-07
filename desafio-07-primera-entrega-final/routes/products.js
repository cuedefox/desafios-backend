const express = require('express');
const {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct
} = require('../controllers/products.js');
const router = express.Router();

router.get('/:id?', getProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;