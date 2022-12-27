const admin = require('firebase-admin');
const serviceAccount = require('../proyecto-final-backend-34ab7-firebase-adminsdk-lstaa-6429ad904b.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

class Container {
	constructor() {
		this.db = admin.firestore();
	}
	save(obj) {
		try {
			return this.db.collection('products').add(obj);
		} catch (err) {
			console.log(err);
		}
	}
	getById(id) {
		try {
			const data = this.db.doc(`/products/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	async getAll() {
		try {
			const data = await this.db.collection('products').get();
			let docs = [];
			data.forEach(doc => {
				docs.push(doc.data());
			})
			return docs;
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