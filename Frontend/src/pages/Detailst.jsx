import React, { useEffect, useState } from "react";
import Navbar from "../Componet/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Detailst() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(data.details);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
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

        await fetchUser(); // Refresh user data after adding to cart
      } catch (error) {
        console.log("Response Error:", error.response?.data);
        console.log("Status:", error.response?.status);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  const isProductInCart = (productId) => {
    return user?.cart?.some((item) => item.productId?._id === productId);
  };

  const handleAddToFavorites = async (productId) => {
    if (isLoggedIn) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/product/add-to-favorites/${productId}`,
          {},
          {
            withCredentials: true,
          },
        );
        await fetchUser(); // Refresh user data after adding to favorites
      } catch (error) {
        console.log("Response Error:", error.response?.data);
        console.log("Status:", error.response?.status);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  const isWishlisted = (productId) => {
    return user?.wishlist?.some((item) => {
      if (!item) return false;

      const id = item._id ? item._id.toString() : item.toString();

      return id === productId.toString();
    });
  };

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product/${id}`,
        {
          withCredentials: true,
        },
      );

      setProduct(data.product);
    } catch (error) {
      console.log(error);
      console.error("Error fetching product:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>

        <button
          onClick={() => navigate("/shop")}
          className="mt-5 bg-black text-white px-6 py-3 rounded-xl"
        >
          Back To Shop
        </button>
      </div>
    );
  }

  const finalPrice =
    product.productPrice -
    (product.productPrice * (product.productDiscount || 0)) / 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <Navbar user={user} isLogged={!!user} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 border border-gray-300 px-5 py-2 rounded-xl hover:bg-black hover:text-white transition"
        >
          ← Back
        </button>

        <div className="bg-white rounded-[35px] border shadow-sm overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 p-6 lg:p-10">
            {/* Image Section */}
            <div>
              <div className="bg-gray-100 rounded-[30px] overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${product.productImage}`}
                  alt={product.productName}
                  className="w-full h-[500px] object-cover object-top hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              {product.weekDials && (
                <span className="bg-black text-white px-4 py-2 rounded-full text-sm w-fit mb-4">
                  🔥 Week Deal
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold">
                {product.productName}
              </h1>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.productDescription}
              </p>

              <div className="mt-6">
                <span className="bg-gray-100 px-4 py-2 rounded-xl text-sm font-medium">
                  {product.productCategory}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mt-8">
                <h2 className="text-4xl font-bold">
                  ₹{Math.round(finalPrice)}
                </h2>

                {product.productDiscount > 0 && (
                  <>
                    <span className="text-gray-400 text-xl line-through">
                      ₹{product.productPrice}
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">
                      {product.productDiscount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-gray-500 text-sm">Category</p>

                  <h3 className="font-bold mt-1">{product.productCategory}</h3>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5">
                  <p className="text-gray-500 text-sm">Discount</p>

                  <h3 className="font-bold mt-1">
                    {product.productDiscount || 0}%
                  </h3>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button
                  onClick={() => {
                    if (isProductInCart(product._id)) {
                      navigate("/cart");
                    } else {
                      handleAddToCart(product._id);
                    }
                  }}
                  className="flex-1  bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-800 transition"
                >
                  {isProductInCart(product._id) ? "Go to Cart" : "Add To Cart"}
                </button>

                <button
                  onClick={() => handleAddToFavorites(product._id)}
                  className="flex-1 border border-black py-4 rounded-2xl font-semibold hover:bg-black hover:text-white transition"
                >
                  {isWishlisted(product._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailst;
