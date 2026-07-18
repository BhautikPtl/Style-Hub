import Navbar from "../Componet/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Wishlist() {
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
    } catch (error) {
      console.error("Error checking login status:", error);
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/product/add-to-favorites/${productId}`,
        {},
        { withCredentials: true },
      );
      CheckLogin(); // Refresh user data after removing from wishlist
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  {
    /* loading screen */
  }
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-lg">
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
    <div className="min-h-screen px-6 py-6">
      <Navbar isLogged={isLoggedIn} user={user} />

      {isLoggedIn ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">My Wishlist ❤️</h2>

          {user?.wishlist?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {user.wishlist.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="bg-gray-100">
                    <img
                      src={`http://localhost:5000/uploads/${item.productImage}`}
                      alt={item.productName}
                      className="w-full h-72 object-cover object-top hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {item.productName}
                    </h3>

                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {item.productDescription}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-black">
                        ₹{item.productPrice}
                      </span>

                      <button
                        onClick={() => handleRemoveFromWishlist(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <h3 className="text-2xl font-semibold">Wishlist is Empty</h3>
              <p className="text-gray-500 mt-2">
                Add products to your wishlist.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-gray-600">
            You need to be logged in to view your wishlist.
          </p>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
