import React from "react";

const Product = ({product}) => {
    return <li key={product._id} className="product">
        <div className="imgBox">
            <img src={product.thumbnail} alt={product.title} />
        </div>
        <div class="contentBox">
            <h3>{product.title}</h3>
            <h2 class="price">${product.price}</h2>
            <a href="#" class="buy">Detail</a>
        </div>
    </li>
}

export default Product;