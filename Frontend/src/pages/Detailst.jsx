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
  const [selectedImage, setSelectedImage] = useState("");

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

      if (data.product.productImages?.length > 0) {
        setSelectedImage(data.product.productImages[0]);
      }
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

        <div className="bg-white rounded-[35px] shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-5 md:p-8 lg:p-10">
            {/* ================= Images ================= */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Thumbnails */}
              <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
                {product.productImages?.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition duration-300 flex-shrink-0 ${
                      selectedImage === image
                        ? "border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    <img
                      src={`http://localhost:5000/uploads/${image}`}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="order-1 lg:order-2 flex-1">
                <img
                  src={`http://localhost:5000/uploads/${selectedImage}`}
                  alt={product.productName}
                  className="max-h-full object-cover rounded-2xl w-full"
                />
              </div>
            </div>

            {/* ================= Details ================= */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-5xl font-bold mt-5">
                {product.productName}
              </h1>

              <p className="text-gray-500 mt-5 leading-7 text-base">
                {product.productDescription}
              </p>

              {/* Category */}
              <div className="mt-5">
                <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                  {product.productCategory}
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <h2 className="text-4xl font-bold">
                  ₹{Math.round(finalPrice)}
                </h2>

                {product.productDiscount > 0 && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      ₹{product.productPrice}
                    </span>

                    <span className="bg-green-100 text-green-700 px-3 py-2 rounded-full font-semibold">
                      {product.productDiscount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-100 rounded-2xl p-5">
                  <p className="text-gray-500 text-sm">Category</p>

                  <h3 className="font-bold mt-2">{product.productCategory}</h3>
                </div>

                <div className="bg-gray-100 rounded-2xl p-5">
                  <p className="text-gray-500 text-sm">Discount</p>

                  <h3 className="font-bold mt-2">
                    {product.productDiscount || 0}%
                  </h3>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                <button
                  onClick={() => {
                    if (isProductInCart(product._id)) {
                      navigate("/cart");
                    } else {
                      handleAddToCart(product._id);
                    }
                  }}
                  className="bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
                >
                  {isProductInCart(product._id) ? "Go To Cart" : "Add To Cart"}
                </button>

                <button
                  onClick={() => handleAddToFavorites(product._id)}
                  className="border-2 border-black py-4 rounded-2xl font-semibold hover:bg-black hover:text-white transition"
                >
                  {isWishlisted(product._id)
                    ? "Remove Wishlist"
                    : "Add Wishlist"}
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
