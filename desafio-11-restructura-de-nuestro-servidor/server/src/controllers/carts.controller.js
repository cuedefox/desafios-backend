import CartManager from "../dao/mongo/cart.service.js";

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