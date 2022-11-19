const products = [];

class Product {
	constructor(title, price, thumbnail) {
		this.title = title;
		this.price = price;
		this.thumbnail = thumbnail;
	}
}

module.exports = { Product, products };