import { Router } from "express";
import products from "./products.routes.js";
import cart from "./carts.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);

export default router;