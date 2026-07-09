import React, { useState, useEffect } from 'react'
import Herobg from "../assets/heroImg.png";
import DiscountTag from '../3dImage/DiscountTag.png';
import { useNavigate } from "react-router-dom";

function DiscountProduct(props) {

    const navigate = useNavigate();
    const isLoggedIn = props.isLogged;

    const handleAddToCart = () => {
        console.log("isLoggedIn:", isLoggedIn);

        if (isLoggedIn) {
            navigate("/cart");
        } else {
            navigate("/login");
        }
    };

    const products = [
        {
            id: 1,
            name: "Premium Hoodie",
            price: 999,
            oldPrice: 1999,
            discount: 50,
            category: "man",
            image: Herobg,
        },
        {
            id: 2,
            name: "Casual Shirt",
            price: 799,
            oldPrice: 1399,
            discount: 40,
            category: "man",
            image: Herobg,
        },
        {
            id: 3,
            name: "Denim Jacket",
            price: 1499,
            oldPrice: 2299,
            discount: 35,
            category: "woman",
            image: Herobg,
        },
        {
            id: 4,
            name: "Oversized T-Shirt",
            price: 599,
            oldPrice: 1199,
            discount: 50,
            category: "woman",
            image: Herobg,
        },
        {
            id: 5,
            name: "Cotton Shirt",
            price: 899,
            oldPrice: 1499,
            discount: 40,
            category: "woman",
            image: Herobg,
        },
        {
            id: 6,
            name: "Formal Pant",
            price: 699,
            oldPrice: 1299,
            discount: 45,
            category: "man",
            image: Herobg,
        },
        {
            id: 7,
            name: "Winter Jacket",
            price: 1799,
            oldPrice: 2799,
            discount: 0,
            category: "man",
            image: Herobg,
        },
        {
            id: 8,
            name: "Black Hoodie",
            price: 1199,
            oldPrice: 1999,
            discount: 0,
            category: "woman",
            image: Herobg,
        },
    ];


    const discountedProducts = products.filter((product) => product.discount > 0);
    return (
        <div className='w-full flex flex-col gap-5 items-center justify-center mt-6'>

            <div className="w-full rounded-3xl flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start mt-6 gap-3">
                <img
                    src={DiscountTag}
                    alt="Discount Tag"
                    className="w-28 sm:w-32 md:w-40"
                />

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center md:text-left">
                    Discount Product Section
                </h1>
            </div>

            {discountedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 gap-5">
                    {discountedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                                <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                                    {`${product.discount}% OFF`}
                                </span>

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                                />
                            </div>

                            <h3 className="font-semibold mt-4">
                                {product.name}
                            </h3>

                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-lg font-bold">
                                    ₹{Math.round(product.price * product.discount / 100)}
                                </span>

                                <span className="text-gray-400 line-through text-sm">
                                    ₹{product.price}
                                </span>
                            </div>

                            <button
                                onClick={() => isLoggedIn ? navigate('/cart') : navigate('/login')}
                                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No discounted products available.</p>
            )}
        </div>
    )
}

export default DiscountProduct