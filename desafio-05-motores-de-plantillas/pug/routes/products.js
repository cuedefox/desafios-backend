const { Router } = require('express');
const router = Router();

let products = [];

router.get('/', (req, res) => res.render('form'));

router.get('/products', (req, res) => res.render('products', { products }));

router.post('/products', (req, res) => {
	const { name, price, picture } = req.body;
	products.push({ name, price, picture });
	res.render('form');
});

module.exports = router;