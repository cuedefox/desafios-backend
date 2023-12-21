import { Router } from "express";
import { getProducts } from "../controllers/mock.controller.js";

const router = Router();

router.get('/mockingproducts', getProducts);

export default router;