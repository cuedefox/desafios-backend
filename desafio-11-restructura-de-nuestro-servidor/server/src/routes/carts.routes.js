import { Router } from "express";
import {
    getCartControllers, 
    createCartControllers, 
    addProductToCartControllers, 
    updateCartControllers, 
    updateProductQuantityControllers, 
    removeProductFromCartControllers, 
    cleanCartControllers
} from '../controllers/carts.controller.js';

const router = Router();


router.get('/:cid', getCartControllers);

router.post('/', createCartControllers);

router.post('/:cid/product/:pid', addProductToCartControllers);

router.put('/:cid', updateCartControllers);

router.put('/:cid/product/:pid', updateProductQuantityControllers);

router.delete('/:cid/product/:pid', removeProductFromCartControllers);

router.delete('/:cid', cleanCartControllers);

export default router;