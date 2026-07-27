import React, { useEffect, useState } from "react";
import AdminNavbar from "../Componet/AdminNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ShowProduct() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/product/delete-product/${productId}`,
        {
          withCredentials: true,
        },
      );

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== productId),
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/get-admin-products",
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

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      category === "all" || product.productCategory === category;

    const searchMatch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  const itemsPerPage = 4;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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

        <div className="flex gap-4  justify-between  items-center mb-6">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="px-4 py-2 border rounded-xl outline-none"
            />
          </div>
          <div className="flex gap-2 items-center">
            <select
              className="px-4 py-2 border rounded-xl outline-none"
              defaultValue="all"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Filter by Category</option>
              <option value="man">Man</option>
              <option value="woman">Women</option>
            </select>
          </div>
        </div>

        {message && (
          <div className="bg-red-100 text-red-600 p-4 rounded-2xl mb-6">
            {message}
          </div>
        )}

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative">
                <img
                  src={`http://localhost:5000/uploads/${product.productImages[0]}`}
                  alt={product.productName}
                  className="w-full h-64 object-cover object-top"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x400?text=No+Image";
                  }}
                />

                {/* Discount Badge */}
                {product.productDiscount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {product.productDiscount}% OFF
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3">
                <h2 className="text-xl font-bold text-gray-800 truncate">
                  {product.productName}
                </h2>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2 h-10">
                  {product.productDescription}
                </p>

                <div className="mt-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                    {product.productCategory}
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black">
                    ₹{product.productPrice}
                  </h2>
                </div>

                {/* Buttons */}
                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                    className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Edit Product
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>

                  <select
                    defaultValue={product.productDiscount}
                    onChange={(e) =>
                      handleDiscountChange(product._id, e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">0% Discount</option>
                    <option value="10">10% Discount</option>
                    <option value="20">20% Discount</option>
                    <option value="30">30% Discount</option>
                    <option value="40">40% Discount</option>
                    <option value="50">50% Discount</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <div className="px-4 py-2 bg-gray-100 rounded-lg">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        {/* Empty State */}
        {currentProducts.length === 0 && (
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
