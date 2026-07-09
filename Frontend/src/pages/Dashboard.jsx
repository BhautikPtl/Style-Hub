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
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Componet/Footer";
import axios from "axios";

function Dashboard() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

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
      // setUser(data.details);

    }
    catch (error) {
      console.error("Error checking login status:", error);
    }
  }

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

  const products = [
    {
      id: 1,
      name: "Premium Hoodie",
      price: 999,
      oldPrice: 1999,
      discount: "50% OFF",
      image: Herobg,
    },
    {
      id: 2,
      name: "Casual Shirt",
      price: 799,
      oldPrice: 1399,
      discount: "40% OFF",
      image: Herobg,
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 1499,
      oldPrice: 2299,
      discount: "35% OFF",
      image: Herobg,
    },
    {
      id: 4,
      name: "Oversized T-Shirt",
      price: 599,
      oldPrice: 1199,
      discount: "50% OFF",
      image: Herobg,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-6">

      {/* Navbar */}
      <Navbar isLogged={isLoggedIn} users={user} />

      {/* Hero Section */}
      <section className="mt-5 relative overflow-hidden rounded-[32px] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

        {/* Background Glow */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-12 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] rounded-full bg-gray-100 blur-3xl"></div>

        <div className="relative flex flex-col-reverse lg:flex-row items-center justify-between min-h-[500px] md:min-h-[600px] lg:min-h-[650px]">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 px-6 md:px-10 lg:px-20 py-10 z-10">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]">

              <span className="text-gray-400 block">
                Elevate Your
              </span>

              <span className="text-black block mt-2">
                Everyday Style
              </span>

            </h1>

            <p className="mt-6 text-gray-500 text-base lg:text-lg leading-relaxed max-w-xl">
              Discover the latest trends in fashion and accessories.
              Shop premium collections designed to elevate your
              everyday look.
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
                <p className="text-sm text-gray-500">
                  Summer Collection
                </p>
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
                <p className="font-bold text-lg">
                  50% OFF
                </p>

                <p className="text-sm text-gray-500">
                  Limited Time
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-5 rounded-3xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-5 md:p-6 lg:p-8">

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
            <h2 className="text-3xl font-bold">
              🔥 Deals Of The Week
            </h2>
            <p className="text-gray-500">
              Grab these products before the offer ends.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden">

                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                  {product.discount}
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 md:h-60 object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <h3 className="font-semibold mt-4 text-sm md:text-base">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg md:text-xl font-bold">
                  ₹{product.price}
                </span>

                <span className="text-gray-400 line-through text-sm">
                  ₹{product.oldPrice}
                </span>
              </div>

              <button 
              onClick={() => isLoggedIn ? navigate('/cart') : navigate('/login')}
              className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                Add To Cart
              </button>
            </div>
          ))}

        </div>

      </section>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;