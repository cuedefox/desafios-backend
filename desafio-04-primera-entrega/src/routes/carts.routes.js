import { Router } from "express";
import CartManager from "../controllers/cart.controller.js";

const router = Router();
const manager = new CartManager('./src/data/cart.json');

router.post('/', async (req, res) => {
    try {
        let status = await manager.addCart();
        res.status(status.code).json({status: status.status});
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
})

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cartProducts = await manager.getProductsOfCartById(parseInt(cid));
    if(cartProducts) {
      res.send({status: "success", payload: cartProducts });
    }else {
      res.status(404).json({'error': 'Carrito no encontrado'});
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        let status = await manager.addProductToCart(parseInt(cid), parseInt(pid));
        res.status(status.code).json({status: status.status});
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
})

export default router;