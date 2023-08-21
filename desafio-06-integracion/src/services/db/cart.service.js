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
            const cart = await MODEL_CARTS.findById(id);
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
}
