import Navbar from '../Componet/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Orders() {

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
      <Navbar isLogged={isLoggedIn} user={user} />

      {
        isLoggedIn ? (
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            <p className="text-gray-600">Here you can view your past orders.</p>

            {user.orders && user.orders.length > 0 ? "yes" : "no"}
          </div>
        ) : (

          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600">You need to be logged in to view your orders.</p>
          </div>
        )
      }
    </div>
  )
}

export default Orders