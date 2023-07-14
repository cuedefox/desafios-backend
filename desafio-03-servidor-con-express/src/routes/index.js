import { Router } from "express";
import products from "./products.js";

const router = Router();

router.use('/products', products);

export default router;