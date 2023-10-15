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

            // Verificar si hay suficiente stock
            if (product.stock >= quantityInCart) {
                // Restar la cantidad del carrito del stock del producto
                product.stock -= quantityInCart;

                // Agregar este producto actualizado a la lista de productos para actualizar
                productsToUpdate.push(product);
            } else {
                // Si no hay suficiente stock, agrega el producto al carrito de productos a mantener
                productsToKeep.push(item);
            }
        }

        // Actualizar el stock de los productos en la base de datos
        await Promise.all(productsToUpdate.map((product) => manager.updateProduct(product._id, product)));

        // Actualizar el carrito con los productos que se pueden comprar
        await manager.updateCart(cid, productsToKeep);

        // Crear un nuevo ticket
        const totalAmount = productsToUpdate.reduce((total, product) => {
            const quantityInCart = cart.products.find(item => item.product.equals(product._id)).quantity;
            const productPrice = product.price;
            return total + productPrice * quantityInCart;
        }, 0);

        const ticket = {
            code: generateUniqueTicketCode(), // Debes implementar esta función
            purchase_datetime: new Date(),
            amount: totalAmount,
            purchaser: req.session.email || 'anon',
        };

        // Guardar el ticket en la base de datos
        const createdTicket = await manager.createTicket(ticket);

        // Devuelve un array con los productos que no se han podido comprar
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