const { Container } = require('../container.js');

let admin;
const carts = new Container('./data/carts.json');

const addCart = (req, res) => {
	const products = req.body;
	if (!products) return carts.saveCart([]);
	carts.saveCart(products);
	res.json({ message: 'Carrito agregado' });
};

const deleteCart = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id))
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un carrito listado' });
	const cartDeleted = carts.deleteById(id);
	if (cartDeleted === -1)
		return res
			.status(404)
			.json({ message: 'El ID no pertenece a un carrito listado' });
	res.json({ message: 'Carrito eliminado' });
};

const getProducts = (req, res) => {
	const id = Number(req.params.id);
	if (isNaN(id))
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un carrito listado' });
	const cartSelected = carts.getById(id);
	if (cartSelected == null)
		return res
			.status(404)
			.send({ message: 'Ingresa el ID de un carrito listado' });
	res.json({ Productos: cartSelected.products });
};

const addProductToCart = (req, res) => {
	const idCartSelected = Number(req.params.id);
	if (isNaN(idCartSelected))
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un carrito listado' });
	const idProduct = req.body.id;
    console.log(idProduct);
	const productSaved = carts.saveProduct(idCartSelected, idProduct);
	if (!productSaved) return res.status(404).send({ message: 'Error' });
	res.json({ message: productSaved });
};

const deleteProduct = (req, res) => {
	const id = Number(req.params.id);
	const id_prod = Number(req.params.id_prod);
	if (isNaN(id) || isNaN(id_prod))
		return res
			.status(400)
			.send({ message: 'Ingresa el ID de un carrito listado' });
	const productDeleted = carts.deleteProduct(id, id_prod);
	if (productDeleted == -1 || !productDeleted)
		return res.status(404).send({ message: 'Error' });
	res.json({ message: 'Producto eliminado' });
};

module.exports = {
	addCart,
	deleteCart,
	getProducts,
	addProductToCart,
	deleteProduct
};