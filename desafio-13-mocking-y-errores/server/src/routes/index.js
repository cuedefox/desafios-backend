import { Router } from "express";
import products from "./products.routes.js";
import cart from "./carts.routes.js";
import session from "./session.routes.js";
import mock from "./mock.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);
router.use('/api/sessions', session);
router.use('/api', mock);

export default router;