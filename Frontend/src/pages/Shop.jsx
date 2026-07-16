import React, { useState ,useEffect} from "react";
import Navbar from "../Componet/Navbar";
import Herobg from "../assets/heroImg.png";
import Footer from "../Componet/Footer";
import FilterProduct from "../Componet/FilterProduct";
import DiscountProduct from "../Componet/DiscountProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Shop() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }
    catch (error) {
      console.error("Error checking login status:", error);
      setLoading(false);
    }
  }

  {/* loading screen */}
if (loading) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-lg">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-8 border border-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-[3px] border-gray-200 border-t-black rounded-full animate-spin"></div>

          <h2 className="text-lg font-semibold text-gray-900">
            Loading...
          </h2>

          <p className="text-sm text-gray-500">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen px-4 md:px-6 py-6 bg-gray-50">
      <Navbar isLogged={isLoggedIn} user={user}  />

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mt-5 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between min-h-[180px] md:min-h-[240px] lg:min-h-[300px] px-5 md:px-10 lg:px-14">
          <div className="z-10 max-w-[60%] md:max-w-[45%]">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-3">
              Shop
            </h1>

            <p className="text-gray-500 text-sm md:text-base lg:text-lg">
              Discover the latest trends in fashion and accessories.
            </p>
          </div>

          <div className="absolute right-0 bottom-[00px] md:right-0 md:bottom-[-40] lg:right-0 lg:bottom-[-80px] h-full flex items-end">
            <img
              src={Herobg}
              alt="Fashion Hero"
              className="
                w-[250px]
                sm:w-[250px]
                md:w-[350px]
                lg:w-[500px]
                xl:w-[600px]
                object-contain
              "
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-6"></div>

      {/* Filter Product Section */}
      <FilterProduct isLogged={isLoggedIn} user={user} setUser={setUser} />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-6"></div>

      {/*Discount Product Section */}
      <DiscountProduct isLogged={isLoggedIn} user={user} setUser={setUser} />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-6"></div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Shop;
