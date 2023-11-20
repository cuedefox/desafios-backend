import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    isCodeUnique = async code => {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            logger.error(error);
        }
    }
    
    validateFields(product) {
        return (
          product.hasOwnProperty('title') &&
          product.hasOwnProperty('description') &&
          product.hasOwnProperty('price') &&
          product.hasOwnProperty('status') &&
          product.hasOwnProperty('code') &&
          product.hasOwnProperty('stock') &&
          product.hasOwnProperty('category') &&
          typeof product.title === 'string' &&
          typeof product.description === 'string' &&
          typeof product.price === 'number' &&
          typeof product.status === 'boolean' &&
          typeof product.code === 'string' &&
          typeof product.stock === 'number' &&
          typeof product.category === 'string'
        );
    }

    writeFile = async data => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            logger.error(error);
        }
    }

    addProduct = async product => {
        try {
            if(await this.isCodeUnique(product.code)) {
                return {code: 409, status: 'Este producto ya existe'};
            }
            if(!this.validateFields(product)) {
                return {code: 400, status: 'Todos los campos del producto deben ser ingresados'};
            }
            let products = await this.getProducts();
            const newProduct = {
                ...product,
                id: products.length > 0 ? products[products.length - 1].id + 1 : 1
            }
            products.push(newProduct);
            await this.writeFile(products);
            return {code: 200, status: 'Producto agregado', product: newProduct};
        } catch (error) {
            logger.error(error);
        }
    }

    getProducts = async() => {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            if(error.message.includes('no such file or directory')) return [];
            logger.error(error);
        }
    }

    getProductById = async id => {
        const products = await this.getProducts();
        try {
            const product = products.find(product => product.id === id);
            return product ? product : false;
        } catch (error) {
            logger.error(error);
        }
    }

    deleteProductById = async id => {
        const products = await this.getProducts();
        try {
            const product = await this.getProductById(id);
            if(product) {
                const newProducts = products.filter(product => product.id !== id);
                await this.writeFile(newProducts);
                return {code: 200, status: 'Producto eliminado'};
            }else {
                return {code: 404, status: 'Producto no existe'};
            }
        } catch (error) {
            logger.error(error);
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
                return {code: 200, status: 'Producto actualizado'};
            } else {
                return {code: 404, status: 'Producto no encontrado'};
            }
        } catch (error) {
            logger.error(error);
        }
    }
}