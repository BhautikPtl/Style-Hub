import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartShopping,
  faUsers,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../Componet/AdminNavbar";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/get-admin-products",
        {
          withCredentials: true,
        },
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.log("Products Error:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-orders",
        {
          withCredentials: true,
        },
      );

      setOrders(response.data.orders || []);
    } catch (error) {
      console.log("Orders Error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/get-users",
        {
          withCredentials: true,
        },
      );

      setUsers(response.data.users || []);
    } catch (error) {
      console.log("Users Error:", error);
    }
  };

  const revenue = orders.reduce(
    (total, order) => total + (order.totalAmount || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <p className="text-gray-500 mt-2">Welcome Back Admin 👋</p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Products</p>

                <h2 className="text-4xl font-bold mt-2">{products.length}</h2>
              </div>

              <div className="bg-blue-100 p-5 rounded-2xl">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="text-3xl text-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Orders</p>

                <h2 className="text-4xl font-bold mt-2">{orders.length}</h2>
              </div>

              <div className="bg-green-100 p-5 rounded-2xl">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-3xl text-green-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Users</p>

                <h2 className="text-4xl font-bold mt-2">{users.length}</h2>
              </div>

              <div className="bg-purple-100 p-5 rounded-2xl">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-3xl text-purple-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Revenue</p>

                <h2 className="text-4xl font-bold mt-2">₹{revenue}</h2>
              </div>

              <div className="bg-orange-100 p-5 rounded-2xl">
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className="text-3xl text-orange-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          {/* Recent Products */}

          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">Latest Products</h2>

            {[...products]
              .reverse()
              .slice(0, 5)
              .map((product) => {
                return (
                  <div
                    key={product._id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:5000/uploads/${product.productImages[0]}`}
                        className="w-16 h-16 rounded-xl object-cover object-top"
                        alt={product.productName}
                      />

                      <div>
                        <h3 className="font-semibold">{product.productName}</h3>
                        <p className="text-gray-500">₹{product.productPrice}</p>
                      </div>
                    </div>

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {product.productCategory}
                    </span>
                  </div>
                );
              })}
          </div>

          {/* Recent Orders */}

          <div className="bg-white rounded-3xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">Recent Orders</h2>

            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <h3 className="font-semibold">{order.userId?.name}</h3>

                    <p className="text-gray-500">
                      {order.products?.length} Items
                    </p>
                  </div>

                  <div className="text-right">
                    <h3 className="font-bold">₹{order.totalAmount}</h3>

                    <span className="text-green-600 text-sm">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
