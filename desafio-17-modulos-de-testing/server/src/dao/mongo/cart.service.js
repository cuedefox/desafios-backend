import { MODEL_CARTS } from "../../models/cart.model.js";
import { MODEL_PRODUCTS } from "../../models/product.model.js";
import { MODEL_TICKETS } from "../../models/ticket.model.js";
import { logger } from "../../config/logger_CUSTOM.js";

export default class CartManager {

    async addCart() {
        try {
            const newCart = {
                products: []
            };
            const result = await MODEL_CARTS.create(newCart);
            return { code: 200, status: `Carrito agregado con id: ${result.id}` };
        } catch (error) {
            logger.error(error);
        }
    }

    async getCarts() {
        try {
            const carts = await MODEL_CARTS.find();
            return carts.map(cart => cart.toObject());
        } catch (error) {
            logger.error(error);
        }
    }

    async getProductsOfCartById(id) {
        try {
            const cart = await MODEL_CARTS.findById(id).populate('products.product');
            return cart ? cart.products : false;
        } catch (error) {
            logger.error(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await MODEL_CARTS.findById(cid);
            if (!cart) {
                return { code: 404, status: 'carrito no encontrado' };
            }
            const productExist = cart.products.find(product => product.product.equals(pid));
            if (productExist) {
                productExist.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            await cart.save();
            return { code: 200, status: 'producto agregado al carrito' };
        } catch (error) {
            logger.error(error);
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            const result = await MODEL_CARTS.updateOne(
                { _id: cid },
                { $pull: { products: { product: pid } } }
            );
            if (result.acknowledged === true) {
                return { code: 200, status: 'Producto eliminado del carrito' };
            }
            return { code: 404, status: 'Producto no encontrado en el carrito' };
        } catch (error) {
            logger.error(error);
        }
    }
    
    async updateCart(cid, products) {
        try {
            const result = await MODEL_CARTS.updateOne(
                { _id: cid },
                { products: products }
            );
            if (result.acknowledged === true) {
                return { code: 200, status: 'Carrito actualizado exitosamente' };
            }
            return { code: 404, status: 'Carrito no encontrado' };
        } catch (error) {
            logger.error(error);
        }
    }
    
    async updateProductQuantity(cid, pid, quantity) {
        try {
            logger.debug(`cid: ${cid}, pid: ${pid}, quantity: ${quantity}`);
            const result = await MODEL_CARTS.updateOne(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } }
            );
            if (result.acknowledged === true) {
                return { code: 200, status: 'Cantidad de producto actualizada' };
            }
            return { code: 404, status: 'Producto no encontrado en el carrito' };
        } catch (error) {
            logger.error(error);
        }
    }

    async removeAllProductsFromCart(cid) {
        try {
            const result = await MODEL_CARTS.updateOne(
                { _id: cid },
                { products: [] }
            );
            if (result.acknowledged === true) {
                return { code: 200, status: 'Todos los productos han sido eliminados del carrito' };
            }
            return { code: 404, status: 'Carrito no encontrado' };
        } catch (error) {
            logger.error(error);
        }
    }

    async getCartById(cid) {
        try {
            const cart = await MODEL_CARTS.findById(cid).populate('products.product');
            return cart;
        } catch (error) {
            logger.error(error);
        }
    }

    async updateProduct(productId, productData) {
        logger.info(productData)
        try {
            const result = await MODEL_PRODUCTS.updateOne({ _id: productId }, { $set: { stock: productData.stock } });
            if (result.acknowledged === true) {
                return { code: 200, status: 'Producto actualizado en el carrito' };
            }
            return { code: 404, status: 'Producto no encontrado en el carrito' };
        } catch (error) {
            logger.error(error);
        }
    }

    async createTicket(ticketData) {
        try {
            const result = await MODEL_TICKETS.create(ticketData);
            return { code: 200, status: 'Ticket creado', ticket: result };
        } catch (error) {
            logger.error(error);
            return { code: 500, status: 'Ocurrió un error al crear el ticket' };
        }
    }
}
