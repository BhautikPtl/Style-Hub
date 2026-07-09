import Navbar from '../Componet/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Orders() {

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


  return (
    <div className="min-h-screen px-6 py-6">
      <Navbar isLogged={isLoggedIn} users={user} />

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