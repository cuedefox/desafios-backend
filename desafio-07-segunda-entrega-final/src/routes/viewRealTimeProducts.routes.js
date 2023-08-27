import { Router } from "express";
import ProductManager from "../services/db/product.service.js";

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
    const products = await manager.getProducts();
    res.render('realTimeProducts', {products});
})

export default router;