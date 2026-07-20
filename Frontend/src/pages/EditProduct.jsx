import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../Componet/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [weekDials, setWeekDials] = useState(false);

  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product/${id}`,
      );

      const product = data.product;

      setProductName(product.productName);
      setProductDescription(product.productDescription);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductDiscount(product.productDiscount);

      setPreview(`http://localhost:5000/uploads/${product.productImage}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("productDescription", productDescription);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productDiscount", productDiscount);

      if (productImage) {
        formData.append("productImage", productImage);
      }

      await axios.put(
        `http://localhost:5000/api/product/update-product/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setMessage("Product Updated Successfully");

      setTimeout(() => {
        setMessage("");
        navigate("/showproduct");
      }, 1000);
    } catch (error) {
      console.log(error);
      alert("Failed To Update Product");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

          <form onSubmit={updateProduct} className="space-y-6">
            {/* Image */}
            <div>
              <label className="font-medium block mb-3">Product Image</label>

              <img
                src={preview}
                alt=""
                className="w-40 h-40 rounded-2xl object-cover border mb-4"
              />

              <input
                type="file"
                onChange={(e) => {
                  setProductImage(e.target.files[0]);

                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="font-medium">Product Name</label>

              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <label className="font-medium">Description</label>

              <textarea
                rows="4"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            {/* Price + Category */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">Price</label>

                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="w-full border rounded-xl p-3 mt-2"
                />
              </div>

              <div>
                <label className="font-medium">Category</label>

                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="w-full border rounded-xl p-3 mt-2"
                />
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="font-medium">Discount (%)</label>

              <input
                type="number"
                value={productDiscount}
                onChange={(e) => setProductDiscount(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-xl"
              >
                Update Product
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border px-8 py-3 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
          {message && (
            <p className="mt-4 text-green-500 font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
