import React, { useState, useEffect } from "react";
import AdminNavbar from "../Componet/AdminNavbar";
import axios from "axios";

function ShowOrder() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      const { data } = await axios.get(
        "http://localhost:5000/api/user/get-orders",
        {
          withCredentials: true,
        },
      );

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update Order Status

  const updateOrderStatus = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/user/update-status/${orderId}`,

        {
          orderStatus: newStatus,
        },

        {
          withCredentials: true,
        },
      );

      // Update UI

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order,
        ),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const filteredOrders =
    status === "all"
      ? orders
      : orders.filter((order) => order.orderStatus === status);

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
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="p-5 md:p-7">
        <div
          className="
                flex
                justify-between
                items-center
                mb-5
                "
        >
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>

            <p className="text-gray-500 text-sm">Manage customer orders</p>
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
                    bg-white
                    border
                    rounded-xl
                    px-4
                    py-2
                    "
          >
            <option value="all">All</option>

            <option value="Placed">Placed</option>

            <option value="Processing">Processing</option>

            <option value="Shipped">Shipped</option>

            <option value="Delivered">Delivered</option>

            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div
            className="
                bg-white
                rounded-2xl
                p-8
                text-center
                shadow
                "
          >
            No Orders Found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="
                bg-white
                rounded-2xl
                shadow
                border
                p-5
                "
              >
                {/* Header */}

                <div
                  className="
                    flex
                    justify-between
                    flex-wrap
                    gap-3
                    "
                >
                  <div>
                    <h2 className="font-bold">#{order._id}</h2>

                    <p className="text-gray-600">{order.userId?.name}</p>

                    <p className="text-sm text-gray-400">
                      {order.userId?.email}
                    </p>
                  </div>

                  <div className="text-right">
                    {/* Change Status */}

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className="
                            bg-black
                            text-white
                            rounded-full
                            px-3
                            py-1
                            text-sm
                            "
                    >
                      <option value="Placed">Placed</option>

                      <option value="Processing">Processing</option>

                      <option value="Shipped">Shipped</option>

                      <option value="Delivered">Delivered</option>

                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <p className="text-sm mt-2">
                      Order Status: {order.orderStatus}
                    </p>

                    <p className="text-sm mt-2">
                      Payment Method: {order.paymentMethod}
                    </p>

                    <p className="text-sm mt-2">
                      Payment Status: {order.paymentStatus}
                    </p>
                  </div>
                </div>

                <div
                  className="
                    grid
                    md:grid-cols-3
                    gap-3
                    mt-4
                    "
                >
                  {/* Address */}

                  <div
                    className="
                        bg-gray-50
                        rounded-xl
                        p-4
                        text-sm
                        "
                  >
                    <h3 className="font-bold mb-2">Address</h3>

                    <p>{order.address?.fullName}</p>

                    <p>{order.address?.mobile}</p>

                    <p>{order.address?.addressLine1}</p>

                    <p>
                      {order.address?.city}, {order.address?.state}
                    </p>

                    <p>{order.address?.pincode}</p>
                  </div>

                  {/* Products */}

                  <div
                    className="
                        md:col-span-2
                        grid
                        sm:grid-cols-2
                        gap-3
                        "
                  >
                    {order.products.map((item, index) => (
                      <div
                        key={index}
                        className="
                            border
                            rounded-xl
                            p-3
                            flex
                            gap-3
                            "
                      >
                        <img
                          src={`http://localhost:5000/uploads/${item.productId.productImage}`}
                          className="
                                w-20
                                h-20
                                rounded-lg
                                object-cover
                                "
                        />

                        <div className="text-sm">
                          <h4 className="font-bold">
                            {item.productId.productName}
                          </h4>

                          <p>Qty : {item.quantity}</p>

                          <p>₹{item.totalPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}

                <div
                  className="
                    border-t
                    mt-4
                    pt-3
                    flex
                    justify-end
                    "
                >
                  <div className="text-right text-sm">
                    <p>Subtotal : ₹{order.subtotal}</p>

                    <p>GST : ₹{Math.round(order.sgst + order.cgst)}</p>

                    <h2 className="text-xl font-bold">
                      Total : ₹{order.totalAmount}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowOrder;
