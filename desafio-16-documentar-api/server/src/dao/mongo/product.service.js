import { MODEL_PRODUCTS } from "../../models/product.model.js";
import { logger } from "../../config/logger_CUSTOM.js";

export default class ProductManager {

    async isCodeUnique(code) {
        try {
            const products = await this.getProducts();
            return products.some((product) => product.code === code);
        } catch (error) {
            logger.error(error);
        }
    }
    
    validateFields(product) {
        return (
            product.title &&
            product.description &&
            typeof product.price === 'number' &&
            typeof product.status === 'boolean' &&
            product.code &&
            typeof product.stock === 'number' &&
            product.category &&
            typeof product.title === 'string' &&
            typeof product.description === 'string' &&
            typeof product.code === 'string' &&
            typeof product.category === 'string'
        );
    }

    async addProduct(product) {
        try {
            if(await this.isCodeUnique(product.code)) {
                return { code: 409, status: 'Este producto ya existe' };
            }
            if(!this.validateFields(product)) {
                return { code: 400, status: 'Todos los campos del producto deben ser ingresados' };
            }
            let result = await MODEL_PRODUCTS.create(product);
            return { code: 200, status: 'Producto agregado', product: result };
        } catch (error) {
            logger.error(error);
        }
    }

    async getProducts(optionsQuery, options) {
        try {
            const products = await MODEL_PRODUCTS.paginate(optionsQuery, options);
            return products;
        } catch (error) {
            logger.error(error);
        }
    }

    async getProductById(id) {
        try {
            const product = await MODEL_PRODUCTS.findById(id);
            return product ? product : false;
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProductById(id) {
        try {
            const product = await this.getProductById(id);
            if(product) {
                await MODEL_PRODUCTS.deleteOne({ _id: id });
                return { code: 200, status: 'Producto eliminado' };
            } else {
                return { code: 404, status: 'Producto no existe' };
            }
        } catch (error) {
            logger.error(error);
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const product = await MODEL_PRODUCTS.findByIdAndUpdate(id, updatedFields, { new: true });
            if(product) {
                return { code: 200, status: 'Producto actualizado' };
            } else {
                return { code: 404, status: 'Producto no encontrado' };
            }
        } catch (error) {
            logger.error(error);
        }
    }
}
