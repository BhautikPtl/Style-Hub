import Navbar from '../Componet/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
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
  {/* loading screen */ }
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
    <div className="min-h-screen px-6 py-6">
      <Navbar isLogged={isLoggedIn} users={user} />

      {isLoggedIn ? (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          {/* Render cart items here */}
          {user.cart && user.cart.length > 0 ? (
            <ul>
              {user.cart.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} - {item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your cart.</h1>
        </div>
      )}
    </div>
  )
}

export default Cart