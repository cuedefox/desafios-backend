import CartManager from "../dao/mongo/cart.service.js";
import { generateUniqueTicketCode } from "../utils/generateCode.js";

const manager = new CartManager();

export const getCartControllers = async (req, res) => {
    const { cid } = req.params;
    const cartProducts = await manager.getProductsOfCartById(cid);
    if(cartProducts) {
      res.send({status: "success", payload: cartProducts });
    }else {
      res.status(404).json({'error': 'Carrito no encontrado'});
    }
};

export const createCartControllers = async (req, res) => {
    try {
        let status = await manager.addCart();
        res.status(status.code).json({status: status.status});
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
};

export const addProductToCartControllers = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        let status = await manager.addProductToCart(cid, pid);
        res.status(status.code).json({status: status.status});
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
};

export const updateCartControllers = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const status = await manager.updateCart(cid, products);
        res.status(status.code).json({ status: status.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
};

export const updateProductQuantityControllers = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const status = await manager.updateProductQuantity(cid, pid, quantity);
        res.status(status.code).json({ status: status.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
};

export const removeProductFromCartControllers = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const status = await manager.removeProductFromCart(cid, pid);
        res.status(status.code).json({ status: status.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
};

export const cleanCartControllers = async (req, res) => {
    try {
        const { cid } = req.params;
        const status = await manager.removeAllProductsFromCart(cid);
        res.status(status.code).json({ status: status.status });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
};

export const purchaseCartControllers = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await manager.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productsToUpdate = [];
        const productsToKeep = [];

        for (const item of cart.products) {
            const product = item.product;
            const quantityInCart = item.quantity;

            if (product.stock >= quantityInCart) {
                product.stock -= quantityInCart;
                productsToUpdate.push(product);
            } else {
                productsToKeep.push(item);
            }
        }

        await Promise.all(productsToUpdate.map((product) => manager.updateProduct(product._id, product)));

        await manager.updateCart(cid, productsToKeep);

        const totalAmount = productsToUpdate.reduce((total, product) => {
            const quantityInCart = cart.products.find(item => item.product.equals(product._id)).quantity;
            const productPrice = product.price;
            return total + productPrice * quantityInCart;
        }, 0);

        const ticket = {
            code: generateUniqueTicketCode(),
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: req.session.email || 'anon',
        };

        const createdTicket = await manager.createTicket(ticket);

        const productsNotPurchased = productsToKeep.map(item => item.product);

        return res.status(200).json({
            message: "Compra exitosa",
            ticket: createdTicket,
            productsNotPurchased: productsNotPurchased,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
};