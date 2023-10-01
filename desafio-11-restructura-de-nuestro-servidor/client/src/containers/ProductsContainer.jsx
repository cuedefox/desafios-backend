import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { AuthContext } from "../contexts/AuthContext.jsx";
import axios from "axios";
import Welcome from "../components/Welcome";

const ProductsContainer = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const pageFromQuery = parseInt(queryParams.get("page")) || 1;
  const limitFromQuery = parseInt(queryParams.get("limit")) || 10;

  const fetchProducts = (page, limit) => {
    axios
      .get(`http://localhost:8080/api/products?page=${page}&limit=${limit}`)
      .then((response) => {
        setProducts(response.data.payload.docs);
        setTotalPages(response.data.payload.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handlePageChange = (newPage) => {
    queryParams.set("page", newPage.toString());
    queryParams.set("limit", perPage.toString());

    if (!loading) {
      if (user) {
        navigate(`/products?${queryParams.toString()}`);
        setCurrentPage(newPage);
      } else {
        navigate(`/login`);
      }
    }
  };

  useEffect(() => {
    setCurrentPage(pageFromQuery);
    setPerPage(limitFromQuery);

    if (!loading) {
      fetchProducts(pageFromQuery, limitFromQuery);
    }
  }, [pageFromQuery, limitFromQuery, loading]);

  useEffect(() => {
    if (!loading && !user) {
      navigate(`/login`);
    }
  }, [navigate, user, loading]);

  return (
    <div>
      <Welcome user={user} />
      <ProductsList
        products={products}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ProductsContainer;
