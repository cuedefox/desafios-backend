import * as fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    isCodeUnique = async code => {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            console.log(error);
        }
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

    writeFile = async data => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async product => {
        try {
            if(await this.isCodeUnique(product.code)) {
                return 'Este producto ya existe';
            }
            if(!this.validateFields(product)) {
                return 'Todos los campos del producto deben ser ingresados';
            }
            let products = await this.getProducts();
            const newProduct = {
                ...product,
                id: products.length > 0 ? products[products.length - 1].id + 1 : 1
            }
            products.push(newProduct);
            await this.writeFile(products);
            return 'Producto agregado';
        } catch (error) {
            console.log(error);
        }
    }

    getProducts = async() => {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            if(error.message.includes('no such file or directory')) return [];
            console.log(error);
        }
    }

    getProductById = async id => {
        const products = await this.getProducts();
        try {
            const product = products.find(product => product.id === id);
            return product ? product : false;
        } catch (error) {
            console.log(error);
        }
    }

    deleteProductById = async id => {
        const products = await this.getProducts();
        try {
            const product = await this.getProductById(id);
            if(product) {
                const newProducts = products.filter(product => product.id !== id);
                await this.writeFile(newProducts);
                return 'Producto eliminado';
            }else {
                return 'Producto no existe';
            }
        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, updatedFields) => {
        let products = await this.getProducts();
        try {
            const product = await this.getProductById(id);
            if(product) {
                const productIndex = products.findIndex((product) => product.id === id);
                products[productIndex] = {
                    ...products[productIndex],
                    ...updatedFields
                }
                await this.writeFile(products);
                return 'Producto actualizado';
            } else {
                return 'Producto no encontrado';
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductManager;