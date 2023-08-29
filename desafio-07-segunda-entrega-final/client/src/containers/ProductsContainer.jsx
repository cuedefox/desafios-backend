import React from "react";
import { useNavigate } from "react-router-dom";
import ProductsList from "../components/ProductsList";

const ProductsContainer = () => {
  const navigate = useNavigate();

  const handlePaginationChange = (page, limit) => {
    navigate(`/products?page=${page}&limit=${limit}`);
  };

  return (
    <div>
      <ProductsList onPaginationChange={handlePaginationChange} />
    </div>
  );
};

export default ProductsContainer;
