import Navbar from '../Componet/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Review() {

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
          <h1 className="text-2xl font-bold mb-4">Your Reviews</h1>
          {/* Render review items here */}
          {user.reviews && user.reviews.length > 0 ? (
            <ul>
              {user.reviews.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.productName} - {item.rating} stars
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not submitted any reviews yet.</p>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your reviews.</h1>
        </div>
      )
      }
    </div>
  )
}

export default Review