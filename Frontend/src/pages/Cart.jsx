import Navbar from '../Componet/Navbar'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Cart() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { productId } = useParams();

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



  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.post(

        `http://localhost:5000/api/product/remove-from-cart/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );

      await CheckLogin(); // Refresh user data after removing from cart
    }
    catch (error) {
      console.error("Error removing from cart:", error);
    }
  };


  const handleIncreaseQuantity = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/product/increase-cart-quantity/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );
      await CheckLogin(); // Refresh user data after increasing quantity
    }
    catch (error) {
      console.error("Error increasing quantity:", error);
      console.log("Response Error:", error.response?.data);
      console.log("Status:", error.response?.status);
      console.log(error);
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/product/decrease-cart-quantity/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );
      await CheckLogin(); // Refresh user data after decreasing quantity
    }
    catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

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
    <div className="min-h-screen bg-gray-100">
      <Navbar isLogged={isLoggedIn} user={user} />

      {isLoggedIn ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
              Shopping Cart
            </h1>

            <div className="bg-black text-white px-5 py-2 rounded-xl font-medium">
              {user.cart?.length || 0} Items
            </div>
          </div>

          {user.cart?.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Cart Products */}
              <div className="lg:col-span-2 flex flex-col gap-5">

                {user.cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition p-4 md:p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-5">

                      {/* Product Image */}
                      <div className="w-full md:w-40 h-40 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={`http://localhost:5000/uploads/${item.productId?.productImage}`}
                          alt={item.productId?.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">

                        <h2 className="text-xl font-bold">
                          {item.productId?.productName}
                        </h2>

                        <p className="text-gray-500 mt-2 text-sm">
                          {item.productId?.productDescription}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-4">

                          <span className="text-2xl font-bold">
                            ₹{item.productId?.productPrice}
                          </span>

                          {item.productId?.productDiscount > 0 && (
                            <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                              {item.productId?.productDiscount}% OFF
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-gray-700 font-medium">
                          Total :
                          ₹
                          {item.productId?.productPrice *
                            item.quantity}
                        </p>
                      </div>

                      {/* Quantity */}
                      <div className="flex flex-col justify-center items-center gap-4">

                        <div className="flex items-center border rounded-xl overflow-hidden">

                          <button
                            onClick={() =>
                              handleDecreaseQuantity(
                                item.productId._id
                              )
                            }
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
                          >
                            −
                          </button>

                          <span className="px-5 font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleIncreaseQuantity(
                                item.productId._id
                              )
                            }
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            handleRemoveFromCart(
                              item.productId._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
                        >
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 h-fit">

                <div className="bg-white rounded-3xl shadow-sm p-6">

                  <h2 className="text-2xl font-bold mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4">

                    <div className="flex justify-between">
                      <span>Total Products</span>
                      <span>{user.cart.length}</span>
                    </div>

                    <div className="border-t pt-4 flex justify-between text-xl font-bold">
                      <span>Total</span>

                      <span>
                        ₹
                        {user.cart.reduce(
                          (total, item) =>
                            total +
                            item.productId?.productPrice *
                            item.quantity,
                          0
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 bg-black text-white py-4 rounded-2xl font-semibold hover:bg-gray-800 transition"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed To Checkout
                  </button>

                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full mt-3 border border-black py-4 rounded-2xl font-semibold hover:bg-black hover:text-white transition"
                  >
                    Continue Shopping
                  </button>

                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm p-12 text-center">

              <h2 className="text-3xl font-bold">
                Your Cart Is Empty
              </h2>

              <p className="text-gray-500 mt-3">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-6 bg-black text-white px-8 py-3 rounded-xl"
              >
                Continue Shopping
              </button>

            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
            <h1 className="text-3xl font-bold">
              Please Log In
            </h1>

            <p className="text-gray-500 mt-3">
              You need to be logged in to view your cart.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart