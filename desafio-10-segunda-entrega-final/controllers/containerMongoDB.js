const { model } = require('mongoose');

class Container {
	constructor(collection, schema) {
		this.model = model(collection, schema);
	}
	save(obj) {
		try {
			return this.model.create(obj);
		} catch (err) {
			console.log(err);
		}
	}
	getById(id) {
		try {
			return this.model.findById(id);
		} catch (err) {
			console.log(err);
		}
	}
	getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Container;