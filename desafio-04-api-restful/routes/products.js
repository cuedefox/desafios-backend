const router = require('express').Router();
const {Product, products} = require('../productClass');

router.get('/productos', (req, res) => {
	res.json({ products });
});

router.get('/productos/:id', (req, res) => {
	let product = products.find(
		product => product.id === Number(req.params.id)
	);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ error: 'Product not finded' });
	}
});

router.post('/productos', (req, res) => {
	let { title, price, thumbnail } = req.body;
	let product = new Product(title, price, thumbnail);
	product.id = products.length == 0 ? 1 : products[products.length - 1].id + 1;
	products.push(product);
	res.send(products);
});

router.put('/productos/:id', (req, res) => {
	let { title, price, thumbnail } = req.body;
	let index = products.findIndex(
		product => product.id === Number(req.params.id)
	);
	if (index >= 0) {
		products[index] = { title, price, thumbnail };
		products[index].id = Number(req.params.id);
		res.send(products[index]);
	} else {
		res.status(404).send({ error: 'Product not finded' });
	}
});

router.delete('/productos/:id', (req, res) => {
	let index = products.findIndex(
		product => product.id === Number(req.params.id)
	);
	const eliminated = products[index];
	if (index >= 0) {
		products.splice(index, 1);
		res.send({ message: `The product ${eliminated.title} has been eliminated` });
	} else {
		res.status(404).send({ error: 'Product not finded' });
	}
});

module.exports = router;
