const { products } = require('../container.js');

const getProducts = (req, res) => {
	if (req.params.id == undefined)
		return res.json({ products: products.getAll() });
	const id = Number(req.params.id);
	const product = products.getById(id);
	if (!product)
		return res
			.status(404)
			.send({ message: 'El ID no pertenece a un producto listado' });
	res.status(200).json(product);
};

const addProduct = (req, res) => {
	const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
	products.save({ nombre, descripcion, codigo, foto, precio, stock });
	res.status(200).json({ message: 'Producto agregado' });
};

const updateProduct = (req, res) => {
	const id = Number(req.params.id);
	if (id < 0 || id > products.objects.length)
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un producto listado' });
	if (isNaN(id))
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un producto listado' });
	products.update(id, req.body);
	res.json({ message: 'Producto actualizado' });
};

const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id))
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un producto listado' });
	const productDeleted = products.deleteById(id);
	if (productDeleted === -1)
		return res
			.status(404)
			.json({ message: 'El ID no pertenece a un producto listado' });
	res.json({ message: 'Producto eliminado' });
};

module.exports = {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct
};