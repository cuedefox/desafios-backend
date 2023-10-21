import { generateProduct } from "../utils/mock.js";

export const getProducts = (req, res) => {
    try {
        let products = [];
        for(let i = 0; i < 1000; i++) {
            products.push(generateProduct());
        }
        res.status(200).send({payload: products});
    } catch (error) {

    }
}