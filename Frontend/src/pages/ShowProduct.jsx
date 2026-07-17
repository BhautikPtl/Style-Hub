import React, { useEffect, useState } from "react";
import AdminNavbar from "../Componet/AdminNavbar";
import axios from "axios";

function ShowProduct() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/get-products",
        {
          withCredentials: true,
        },
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);

      setMessage(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDiscountChange = async (productId, newDiscount) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/product/update-discount/${productId}`,
        { productDiscount: newDiscount },
        {
          withCredentials: true,
        },
      );

      setMessage(response.data.message);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, productDiscount: newDiscount }
            : product,
        ),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong",
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

          <h2 className="text-lg font-semibold">Loading Products...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-[35px] p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                Product Management
              </h1>

              <p className="text-gray-500 mt-2">
                Manage all products from your store dashboard
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-black text-white px-6 py-3 rounded-2xl">
                Total Products : {products.length}
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="bg-red-100 text-red-600 p-4 rounded-2xl mb-6">
            {message}
          </div>
        )}

        {/* Products */}
        <div className="space-y-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-[30px] p-5 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="w-full lg:w-44 h-44 bg-gray-100 rounded-3xl overflow-hidden flex-shrink-0">
                  <img
                    src={`http://localhost:5000/uploads/${product.productImage}`}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/400x400?text=No+Image";
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {product.productName}
                      </h2>

                      <p className="text-gray-500 mt-2 max-w-2xl">
                        {product.productDescription}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <span className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
                          {product.productCategory}
                        </span>

                        <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-sm">
                          {product.productDiscount}% OFF
                        </span>

                        <span
                          className={`px-4 py-2 rounded-xl text-sm ${
                            product.weekDials === true ||
                            product.weekDials === "true"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {product.weekDials === true ||
                          product.weekDials === "true"
                            ? "🔥 Week Deal"
                            : "Normal Product"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <h2 className="text-3xl font-bold text-black">
                        ₹{product.productPrice}
                      </h2>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
                      Delete
                    </button>

                    <button className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition">
                      Edit Product
                    </button>

                    <select
                      defaultValue={product.productDiscount}
                      onChange={(e) => {
                        handleDiscountChange(product._id, e.target.value);
                      }}
                      className="px-4 py-2 border rounded-xl outline-none"
                    >
                      <option value="0">0%</option>
                      <option value="10">10%</option>
                      <option value="20">20%</option>
                      <option value="30">30%</option>
                      <option value="40">40%</option>
                      <option value="50">50%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center mt-10">
            <h2 className="text-2xl font-semibold">No Products Found</h2>

            <p className="text-gray-500 mt-2">
              Add your first product to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowProduct;
