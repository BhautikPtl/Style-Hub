import Navbar from '../Componet/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Wishlist() {
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

      {isLoggedIn ? (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
          {/* Render wishlist items here */}
          {user.wishlist && user.wishlist.length > 0 ? (
            <ul>
              {user.wishlist.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.name} - {item.price}
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
          </div>
      ) : (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your wishlist.</h1>
        </div>
      )
      }
    </div>
  )
}

export default Wishlist