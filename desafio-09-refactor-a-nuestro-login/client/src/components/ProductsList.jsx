import React from "react";
import Product from "./Product";

const ProductsList = ({products, handlePageChange, currentPage, totalPages}) => {
  return <div className="products-list">
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </ul>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!products.length || currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!products.length || currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  ;
};

export default ProductsList;
