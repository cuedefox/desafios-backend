import React from "react";
import Product from "./Product";

const CartDetail = ({ cart, cid }) => {
    return (
        <div>
            <h1>Cart Details</h1>
            <p>Cart ID: {cid}</p>
            <h2>Products in Cart:</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.product._id}>
                        <Product product={item.product} />
                        <p>Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CartDetail;