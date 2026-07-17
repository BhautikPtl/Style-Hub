import React, { useEffect, useState } from "react";
import Navbar from "../Componet/Navbar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewOrder() {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(data.details);

      const selectedOrder = data.details.orders?.find(
        (item) => item._id === id,
      );

      setOrder(selectedOrder);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Order Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} isLogged={true} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 mb-6">
          <h1 className="text-3xl font-bold">Order Details</h1>

          <p className="text-gray-500 mt-2">Order ID : {order._id}</p>

          <div className="flex gap-3 mt-4">
            <span className="bg-gray-100 px-4 py-2 rounded-xl">
              {order.paymentMethod}
            </span>

            <span
              className={`px-4 py-2 rounded-xl
                            ${
                              order.orderStatus === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.orderStatus === "Cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
            >
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-bold mb-5">Products</h2>

          <div className="space-y-4">
            {order.products?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border rounded-2xl p-4"
              >
                <img
                  src={`http://localhost:5000/uploads/${item.productId?.productImage}`}
                  alt={item.productId?.productName}
                  className="w-24 h-24 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {item.productId?.productName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Category : {item.productId?.productCategory}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity : {item.quantity}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold">₹{item.totalPrice}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-5">Bill Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shippingCharge}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>
                ₹
                {Math.round(
                  (order.sgst || 0) + (order.cgst || 0) + (order.igst || 0),
                )}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>

              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
        >
          Back To Orders
        </button>
      </div>
    </div>
  );
}

export default ViewOrder;
