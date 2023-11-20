import { Router } from "express";
import {
    getCartControllers, 
    createCartControllers, 
    addProductToCartControllers, 
    updateCartControllers, 
    updateProductQuantityControllers, 
    removeProductFromCartControllers, 
    cleanCartControllers,
    purchaseCartControllers
} from '../controllers/carts.controller.js';
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();


router.get('/:cid', getCartControllers);

router.post('/', authUser, createCartControllers);

router.post('/:cid/product/:pid', authUser, addProductToCartControllers);

router.post("/:cid/purchase", authUser, purchaseCartControllers);

router.put('/:cid', authUser, updateCartControllers);

router.put('/:cid/product/:pid', authUser, updateProductQuantityControllers);

router.delete('/:cid/product/:pid', removeProductFromCartControllers);

router.delete('/:cid', authUser, cleanCartControllers);

export default router;