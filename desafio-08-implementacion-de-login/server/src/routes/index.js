import { Router } from "express";
import products from "./products.routes.js";
import cart from "./carts.routes.js";
import session from "./session.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);
router.use('/api/sessions', session);

export default router;