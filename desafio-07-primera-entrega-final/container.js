const fs = require('fs');

class Container {
	constructor(fileName) {
		this.fileName = fileName;
		this.objects = this.readData();
	}
	generateId() {
		try {
			if (this.objects.length === 0) return 1;
			return this.objects[this.objects.length - 1].id + 1;
		} catch (error) {
			console.log({ error: error.message });
		}
	}
	async save(obj) {
		try {
			obj.id = await this.generateId();
			obj.timestamp = Date.now();
			this.objects.push(obj);
			this.writeData();
			return obj.id;
		} catch (err) {
			console.log(err);
		}
	}
    async saveCart(obj) {
		try {
			obj.id = await this.generateId();
			obj.timestamp = Date.now();
            obj.products = [];
			this.objects.push(obj);
			this.writeData();
			return obj.id;
		} catch (err) {
			console.log(err);
		}
	}
	getById(id) {
		const obj = this.objects.find(el => el.id === id);
		console.log({ obj });
		return obj ? obj : null;
	}
	getAll() {
		try {
			return this.objects;
		} catch (error) {
			console.log({ error: error.message });
			return [];
		}
	}
	deleteById(id) {
		try {
			let indexObj = this.findIndex(obj => obj.id === id);
			if (indexObj === -1) return indexObj;
			this.objects.splice(indexObj, 1);
			this.writeData();
		} catch (err) {
			console.log(err);
		}
	}
	async deleteAll() {
		try {
			this.objects = [];
			this.writeData();
		} catch (err) {
			console.log(err);
		}
	}
	update(id, data) {
		const objToUpdate = this.getById(id);
		const indexObj = this.objects.findIndex(
			obj => obj.id === objToUpdate.id
		);
		this.objects[indexObj] = { ...this.objects[indexObj], ...data };
		this.writeData();
	}
	readData() {
		try {
			return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
		} catch (error) {
			console.log({ error: error.message });
			if (error.message === 'Unexpected end of JSON input') return [];
		}
	}
	async writeData() {
		await fs.promises.writeFile(
			this.fileName,
			JSON.stringify(this.objects, null, 2)
		);
	}
	saveProduct(idCartSelected, idProduct) {
		try {
			const cartSelected = this.getById(idCartSelected);
			if (cartSelected == null) return;
			const productSelected = products.getById(idProduct);
			if (productSelected == null) return;
            cartSelected.products.push(productSelected);
			this.writeData();
			return 'Producto agregado';
		} catch (err) {
			console.log(err);
		}
	}
	deleteProduct(idCartSelected, idProduct) {
		try {
			const cartSelected = this.getById(idCartSelected);
			if (cartSelected == null) return;
			const productToDelete = cartSelected.products.findIndex(
				product => product.id === idProduct
			);
			if (productToDelete == -1) return;
			cartSelected.products.splice(productToDelete, 1);
			this.writeData();
			return 'Producto eliminado!';
		} catch (error) {
			console.log(error);
		}
	}
}

const products = new Container('./data/products.json');

module.exports = { Container, products };