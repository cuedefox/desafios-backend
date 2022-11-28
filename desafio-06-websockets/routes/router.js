const { Router } = require('express');
const router = Router();

let products = [];

router.get('/', (req, res) => res.render('index', { products }));

module.exports = {
	router,
	products
};
