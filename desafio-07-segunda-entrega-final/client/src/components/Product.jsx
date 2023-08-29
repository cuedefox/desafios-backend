import React from "react";

const Product = ({product}) => {
    return <li key={product._id} className="product">
        <h2>{product.title}</h2>
        <img src={product.thumbnail} alt={product.title} />
        <p>Price: ${product.price}</p>
    </li>
}

export default Product;