import { MODEL_CARTS } from "./models/cart.js";

export default class CartManager {

    async addCart() {
        try {
            const newCart = {
                products: []
            };
            const result = await MODEL_CARTS.create(newCart);
            return { code: 200, status: `Carrito agregado con id: ${result.id}` };
        } catch (error) {
            console.log(error);
        }
    }

    async getCarts() {
        try {
            const carts = await MODEL_CARTS.find();
            return carts.map(cart => cart.toObject());
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsOfCartById(id) {
        try {
            const cart = await MODEL_CARTS.findById(id).populate('products.product');
            return cart ? cart.products : false;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const cart = await MODEL_CARTS.findById(cid);
            if (!cart) {
                return { code: 404, status: 'carrito no encontrado' };
            }
            const productExist = cart.products.find(product => product.product === pid);
            if (productExist) {
                productExist.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }
            await cart.save();
            return { code: 200, status: 'producto agregado al carrito' };
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
        }
    }
    
    async updateProductQuantity(cid, pid, quantity) {
        try {
            console.log(`cid: ${cid}, pid: ${pid}, quantity: ${quantity}`);
            const result = await MODEL_CARTS.updateOne(
                { _id: cid, 'products.product': pid },
                { $set: { 'products.$.quantity': quantity } }
            );
            if (result.acknowledged === true) {
                return { code: 200, status: 'Cantidad de producto actualizada' };
            }
            return { code: 404, status: 'Producto no encontrado en el carrito' };
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }
}
