import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "./Product";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageFromQuery = parseInt(queryParams.get("page")) || 1;
  const limitFromQuery = parseInt(queryParams.get("limit")) || 10;

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(pageFromQuery);
    setPerPage(limitFromQuery);

    axios.get(`http://localhost:8080/api/products?page=${pageFromQuery}&limit=${limitFromQuery}`)
      .then(response => {
        setProducts(response.data.payload.docs);
        setTotalPages(response.data.payload.totalPages);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [pageFromQuery, limitFromQuery]);

  const handlePageChange = (newPage) => {
    queryParams.set("page", newPage.toString());
    queryParams.set("limit", perPage.toString());

    navigate(`/products?${queryParams.toString()}`);
  };

  return (
    <div className="products-list">
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
  );
};

export default ProductsList;
