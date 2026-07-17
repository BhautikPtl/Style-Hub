import React, { useState, useEffect } from "react";
import Herobg from "../assets/heroImg.png";
import DiscountTag from "../3dImage/DiscountTag.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DiscountProduct(props) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { isLogged, user, setUser } = props;

  const isLoggedIn = isLogged;

  useEffect(() => {
    CheckLogin();
  }, []);

  const CheckLogin = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(data.details);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (isLoggedIn) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/product/add-to-cart/${productId}`,
          {},
          {
            withCredentials: true,
          },
        );

        await CheckLogin(); // Refresh user data after adding to cart
      } catch (error) {
        console.log("Response Error:", error.response?.data);
        console.log("Status:", error.response?.status);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/get-products",
        {
          withCredentials: true,
        },
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);

      setMessage(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    CheckLogin();
  }, []);

  const isProductInCart = (productId) => {
    return user?.cart?.some((item) => item.productId?._id === productId);
  };

  const discountedProducts = products.filter(
    (product) => product.productDiscount <= 40 && product.productDiscount > 0,
  );

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(discountedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = discountedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center mt-6">
      <div className="w-full rounded-3xl flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start mt-6 gap-3">
        <img
          src={DiscountTag}
          alt="Discount Tag"
          className="w-28 sm:w-32 md:w-40"
        />

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center md:text-left">
          Discount Product Section
        </h1>
      </div>

      {currentProducts.length > 0 ? (
        <div className="grid w-fulljustify-content grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 gap-5">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                  {`${product.productDiscount}% OFF`}
                </span>

                <img
                  src={`http://localhost:5000/uploads/${product.productImage}`}
                  alt={product.productName}
                  className="w-full h-80 object-cover object-top hover:scale-105 transition duration-300"
                />
              </div>

              <h3 className="font-semibold mt-4">{product.productName}</h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold">
                  ₹
                  {Math.round(
                    (product.productPrice * product.productDiscount) / 100,
                  )}
                </span>

                <span className="text-gray-400 line-through text-sm">
                  ₹{product.productPrice}
                </span>
              </div>

              <button
                onClick={() => {
                  if (isProductInCart(product._id)) {
                    navigate("/cart");
                  } else {
                    handleAddToCart(product._id);
                  }
                }}
                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
              >
                {isProductInCart(product._id) ? "Go to Cart" : "Add To Cart"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No discounted products available.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <div className="px-4 py-2 bg-gray-100 rounded-lg">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default DiscountProduct;
