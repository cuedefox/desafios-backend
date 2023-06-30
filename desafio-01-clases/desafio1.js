class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    isCodeUnique(code) {
        return this.products.some((product) => product.code === code);
    }

    validateFields (product) {
        return (
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock
        )
    }

    addProduct(product) {
        if(this.isCodeUnique(product.code)) {
            console.log('Este producto ya existe');
        }
        if(!this.validateFields(product)) {
            console.log('Todos los campos del producto deben ser ingresados');
        }
        const newProduct = {
            ...product,
            id: ++this.id
        }
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        return product ? product : 'Product not found';
    }
}

const product1 = {
    title: 'Metal Gear Solid 3',
    description: 'Best Game Ever',
    price: 600,
    thumbnail: 'https://static.wikia.nocookie.net/metalgear/images/9/97/Metal_Gear_Solid_Subsistence.jpg/revision/latest?cb=20090809021800&path-prefix=es',
    code: 'AB123',
    stock: 10
};
const product2 = {
    title: 'Metal Gear Solid 4',
    description: 'Second best Game Ever',
    price: 610,
    thumbnail: 'https://static.wikia.nocookie.net/metalgear/images/6/69/Metal_gear_solid_4_caratula.jpg/revision/latest?cb=20130526191208&path-prefix=es',
    code: 'ACM1PT',
    stock: 15
};

const manager = new ProductManager();
console.log(manager.getProducts());
manager.addProduct(product1);
console.log(manager.getProducts());
manager.addProduct(product2);
console.log(manager.getProductById(2));
console.log(manager.getProducts());