import React, { useState, useEffect } from "react";
import Navbar from "../Componet/Navbar";
import Herobg from "../assets/heroImg.png";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faShield,
  faRotate,
  faHeadset,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import Footer from "../Componet/Footer";
import axios from "axios";

function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    CheckLogin();
  }, []);

  const CheckLogin = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(data.details);
      setIsLoggedIn(true);
      setLoading(false);
      // setUser(data.details);
    } catch (error) {
      console.error("Error checking login status:", error);
      setLoading(false);
    }
  };

  const features = [
    {
      icon: faTruck,
      title: "Free Shipping",
      subtitle: "On orders over ₹999",
    },
    {
      icon: faShield,
      title: "Secure Payment",
      subtitle: "100% Secure",
    },
    {
      icon: faRotate,
      title: "Easy Returns",
      subtitle: "30 Days Return",
    },
    {
      icon: faHeadset,
      title: "24/7 Support",
      subtitle: "We're Here",
    },
  ];

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
        await CheckLogin(); // Refresh user data after adding to favorites
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

  const isProductInCart = (productId) => {
    return user?.cart?.some((item) => item.productId?._id === productId);
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
  }, []);

  const discountedProducts = products.filter(
    (product) => product.productDiscount >= 50,
  );

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(discountedProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = discountedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  {
    /* loading screen */
  }
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-8 border border-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-[3px] border-gray-200 border-t-black rounded-full animate-spin"></div>

            <h2 className="text-lg font-semibold text-gray-900">Loading...</h2>

            <p className="text-sm text-gray-500">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-6">
      {/* Navbar */}
      <Navbar isLogged={isLoggedIn} user={user} />

      {/* Hero Section */}
      <section className="mt-5 relative overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        {/* Background Glow */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-12 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full bg-gray-100 blur-3xl"></div>

        <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[500px] md:min-h-[600px] lg:min-h-[650px]">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 px-6 md:px-10 lg:px-20 py-10 z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]">
              <span className="text-gray-400 block">Elevate Your</span>

              <span className="text-black block mt-2">Everyday Style</span>
            </h1>

            <p className="mt-6 text-gray-500 text-base lg:text-lg leading-relaxed max-w-xl">
              Discover the latest trends in fashion and accessories. Shop
              premium collections designed to elevate your everyday look.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-black text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                Shop Now
              </button>

              <button className="border border-black px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-black hover:text-white">
                Explore
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full lg:w-1/2 flex justify-center items-center py-10">
            {/* Circle Background */}
            <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full bg-gray-100"></div>

            {/* Trending Card */}
            <div className="hidden lg:flex absolute top-20 left-5 bg-white rounded-2xl shadow-lg px-5 py-3 z-20">
              <div>
                <p className="font-semibold">🔥 Trending</p>
                <p className="text-sm text-gray-500">Summer Collection</p>
              </div>
            </div>

            <img
              src={Herobg}
              alt="Fashion Hero"
              className="
                relative z-10
                w-full
                max-w-[320px]
                sm:max-w-[420px]
                md:max-w-[520px]
                lg:max-w-[620px]
                xl:max-w-[700px]
                object-contain
                select-none
                pointer-events-none
              "
            />

            {/* Offer Card */}
            <div className="hidden lg:flex absolute bottom-16 right-8 bg-white rounded-2xl shadow-lg px-5 py-3 z-20">
              <div>
                <p className="font-bold text-lg">50% OFF</p>

                <p className="text-sm text-gray-500">Limited Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-5 flex justify-center rounded-3xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-5 md:p-6 lg:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                group
                flex flex-col lg:flex-row
                items-center
                text-center lg:text-left
                gap-3
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-12 h-12
                  md:w-14 md:h-14
                  rounded-full
                  bg-white
                  shadow-[0_1px_8px_rgba(15,23,42,0.15)]
                  transition-all duration-300
                  group-hover:shadow-lg
                "
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-lg md:text-xl lg:text-2xl"
                />
              </div>

              <div>
                <h3 className="text-xs md:text-sm lg:text-base font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-[10px] md:text-xs lg:text-sm text-gray-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Section */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">🔥 Deals Of The Week</h2>
            <p className="text-gray-500">
              Grab these products before the offer ends.
            </p>
          </div>
        </div>

        <div className="grid justify-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {currentProducts.map((product) => {
            return (
              <div
                key={product._id}
                className="bg-white relative rounded-3xl p-4 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                    {product.productDiscount}% OFF
                  </span>

                  <img
                    onClick={() => navigate(`/detail/${product._id}`)}
                    src={`http://localhost:5000/uploads/${product.productImage}`}
                    alt={product.productName}
                    className="w-full h-80 object-cover object-top hover:scale-105 transition duration-300"
                  />
                </div>

                <h3 className="font-semibold mt-4 text-sm md:text-base">
                  {product.productName}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg md:text-xl font-bold">
                    ₹
                    {Math.round(
                      product.productPrice -
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
                <button
                  onClick={() => handleAddToFavorites(product._id)}
                  className="absolute top-5 right-5 bg-black text-2xl p-1 rounded-full transition"
                >
                  <FontAwesomeIcon
                    icon={isWishlisted(product._id) ? faHeart : faHeartRegular}
                    className={
                      isWishlisted(product._id) ? "text-red-500" : "text-white"
                    }
                  />
                </button>
              </div>
            );
          })}
        </div>
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
      </section>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
