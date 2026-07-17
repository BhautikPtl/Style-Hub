import Navbar from "../Componet/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Componet/Footer";

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
    } catch (error) {
      console.error("Error checking login status:", error);
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/user/cancel-order/${orderId}`,
        {},
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        CheckLogin();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      console.log(error.response.data.message);
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 px-4 md:px-8 py-6">
      <Navbar isLogged={isLoggedIn} user={user} />

      {isLoggedIn ? (
        <div className="max-w-7xl mx-auto mt-8">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-2xl">
                    📦
                  </div>

                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      My Orders
                    </h1>

                    <p className="text-gray-500 mt-1">
                      Track, manage and view all your orders
                    </p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex gap-3 flex-wrap">
                  <div className="bg-gray-100 rounded-2xl px-5 py-3">
                    <p className="text-xs uppercase text-gray-500">
                      Total Orders
                    </p>

                    <h3 className="text-2xl font-bold">
                      {user.orders?.length || 0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {user.orders?.length > 0 ? (
            <div className="space-y-8 ">
              {user.orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 border-b bg-gray-50">
                    <div>
                      <h3 className="font-bold text-lg">
                        Order #{order._id.slice(-8)}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-xl text-sm font-semibold
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                    >
                      {order.orderStatus}
                    </div>

                    <div className="text-center md:text-right">
                      <p className="text-xs text-gray-500 uppercase">
                        Grand Total
                      </p>

                      <h2 className="text-3xl font-bold">
                        ₹{order.totalAmount}
                      </h2>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="p-5 flex flex-col gap-4">
                    {order.products?.map((item) => (
                      <div
                        key={item._id}
                        className="
  flex
  items-center
  gap-4
  p-3
  bg-white
  border
  border-gray-100
  rounded-2xl
  hover:shadow-md
  transition-all
"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={`http://localhost:5000/uploads/${item.productId?.productImage}`}
                            alt={item.productId?.productName}
                            className="
      w-full
      h-full
      object-cover
      rounded-xl
      border
    "
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate">
                            {item.productId?.productName}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            {item.productId?.productCategory}
                          </p>

                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600">
                              Qty :
                              <span className="font-medium ml-1">
                                {item.quantity}
                              </span>
                            </span>

                            <span className="text-sm text-gray-600">
                              Price :
                              <span className="font-medium ml-1">
                                ₹{item.price}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                          <p className="text-[11px] text-gray-400 uppercase">
                            Total
                          </p>

                          <h3 className="text-lg font-bold">
                            ₹{item.totalPrice}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 p-5 border-t bg-gray-50">
                    <button
                      onClick={() => navigate(`/view-order/${order._id}`)}
                      className="
                                flex-1
                                bg-black
                                text-white
                                py-3
                                rounded-xl
                                hover:bg-gray-800
                                transition
                              "
                    >
                      View Order
                    </button>

                    {order.orderStatus !== "Cancelled" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="
                                    flex-1
                                    border
                                    border-red-500
                                    text-red-500
                                    py-3
                                    rounded-xl
                                    hover:bg-red-500
                                    hover:text-white
                                    transition
                                  "
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
              <div className="text-7xl mb-4">📦</div>

              <h2 className="text-3xl font-bold">No Orders Yet</h2>

              <p className="text-gray-500 mt-2">
                Looks like you haven't placed any orders.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="mt-6 bg-black text-white px-8 py-3 rounded-xl"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <h1 className="text-4xl font-bold">Please Login</h1>

          <p className="text-gray-500 mt-2">Login to view your orders.</p>
        </div>
      )}

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Orders;
