import React, { useState } from 'react';
import AdminNavbar from '../Componet/AdminNavbar';
import axios from 'axios';

function AddProduct() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productCategory, setProductCategory] = useState('');
    const [productDiscount, setProductDiscount] = useState('');

    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", productPrice);
        formData.append("productCategory", productCategory);
        formData.append("productDiscount", productDiscount);
        formData.append("productImage", productImage);

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/product/add-product",
                formData, {
                withCredentials: true,
            }
            );

            setMessage(data.message);

            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductCategory('');
            setProductDiscount('');
            setProductImage(null);

        } catch (error) {
            console.log("ERROR =>", error);
            console.log("RESPONSE =>", error?.response);
            console.log("DATA =>", error?.response?.data);

            setMessage(
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />

            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="bg-white rounded-3xl shadow-lg p-5 md:p-8">

                    <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
                        Add Product
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Product Name */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Product Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter product name"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Product Price */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Product Price
                            </label>

                            <input
                                type="number"
                                placeholder="Enter product price"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Category
                            </label>

                            <select
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                            >
                                <option value="">Select Category</option>
                                <option value="man">Man</option>
                                <option value="woman">Woman</option>
                            </select>
                        </div>

                        {/* Discount */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">
                                Discount
                            </label>

                            <select
                                value={productDiscount}
                                onChange={(e) => setProductDiscount(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                            >
                                <option value="">Select Discount</option>
                                <option value="10">10%</option>
                                <option value="20">20%</option>
                                <option value="30">30%</option>
                                <option value="40">40%</option>
                                <option value="50">50%</option>
                            </select>
                        </div>

                        {/* Image */}
                        <div className="md:col-span-2">
                            <label className="block mb-2 text-sm font-medium">
                                Product Image
                            </label>

                            <input
                                type="file"
                                onChange={(e) => setProductImage(e.target.files[0])}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block mb-2 text-sm font-medium">
                                Product Description
                            </label>

                            <textarea
                                rows="3"
                                placeholder="Enter product description"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none"
                            />
                        </div>

                        {/* Message */}
                        {message && (
                            <div className="md:col-span-2">
                                <p className="text-center text-red-500">{message}</p>
                            </div>
                        )}

                        {/* Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                            >
                                Add Product
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddProduct;