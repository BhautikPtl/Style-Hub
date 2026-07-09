import { useState } from "react";
import Herobg from "../assets/heroImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function FilterProduct(props) {
    const [category, setCategory] = useState("all");
    const [price, setPrice] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilter, setIsFilter] = useState(false);

    const navigate = useNavigate();
    const isLoggedIn = props.isLogged;

    const handleAddToCart = () => {
        console.log("isLoggedIn:", isLoggedIn);
        if (isLoggedIn) {
            navigate("/cart");
        }
        else {
            navigate("/login");
        }
    };

    const itemsPerPage = 4;

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
            discount: 0,
            category: "woman",
            image: Herobg,
        },
        {
            id: 6,
            name: "Formal Pant",
            price: 699,
            oldPrice: 1299,
            discount: 0,
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

    const filteredProducts = products.filter((product) => {
        const categoryMatch =
            category === "all" || product.category === category;

        const priceMatch = product.price <= price * 20;
        const discountMatch = product.discount > 0;
        return categoryMatch && priceMatch && discountMatch;
    });

    const totalPages = Math.ceil(
        filteredProducts.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="w-full mt-6">

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-3 relative">
                <button
                    onClick={() => setIsFilter(!isFilter)}
                    className="lg:hidden m-auto px-4 py-2 bg-black text-white rounded-xl"
                >
                    {isFilter ? (
                        <FontAwesomeIcon icon={faXmark} />
                    ) : (
                        <>
                            Filter<FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                        </>
                    )}
                </button>

                {isFilter && (
                    <div className="absolute left-0 top-14 z-50 w-72 rounded-3xl border border-gray-100 bg-white shadow-xl p-5">
                        <h2 className="font-bold text-lg mb-4">
                            Filters
                        </h2>

                        {/* Category */}
                        <div className="p-4 rounded-2xl bg-zinc-100">
                            <h3 className="font-semibold mb-3">
                                Category
                            </h3>

                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "all"}
                                        onChange={() => {
                                            setCategory("all");
                                            setCurrentPage(1);
                                        }}
                                    />
                                    All Category
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "man"}
                                        onChange={() => {
                                            setCategory("man");
                                            setCurrentPage(1);
                                        }}
                                    />
                                    Man
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={category === "woman"}
                                        onChange={() => {
                                            setCategory("woman");
                                            setCurrentPage(1);
                                        }}
                                    />
                                    Woman
                                </label>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="p-4 rounded-2xl bg-zinc-100 mt-4">
                            <h3 className="font-semibold mb-3">
                                Price
                            </h3>

                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={price}
                                onChange={(e) => {
                                    setPrice(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="w-full"
                            />

                            <p className="mt-2 text-sm text-gray-600">
                                Up To ₹{price * 20}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">

                {/* Filter Sidebar */}
                <div
                    className={
                        "hidden lg:block  w-full lg:w-[300px] xl:w-[320px] bg-white rounded-3xl p-5 shadow-[0_1px_10px_rgba(0,0,0,0.08)] h-fit "}
                >
                    <h2 className="font-bold text-lg mb-4">
                        Filters
                    </h2>

                    {/* Category */}
                    <div className="p-4 rounded-2xl bg-zinc-100">
                        <h3 className="font-semibold mb-3">
                            Category
                        </h3>

                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={category === "all"}
                                    onChange={() => {
                                        setCategory("all");
                                        setCurrentPage(1);
                                    }}
                                />
                                All Category
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={category === "man"}
                                    onChange={() => {
                                        setCategory("man");
                                        setCurrentPage(1);
                                    }}
                                />
                                Man
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={category === "woman"}
                                    onChange={() => {
                                        setCategory("woman");
                                        setCurrentPage(1);
                                    }}
                                />
                                Woman
                            </label>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="p-4 rounded-2xl bg-zinc-100 mt-4">
                        <h3 className="font-semibold mb-3">
                            Price
                        </h3>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={price}
                            onChange={(e) => {
                                setPrice(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="w-full"
                        />

                        <p className="mt-2 text-sm text-gray-600">
                            Up To ₹{price * 20}
                        </p>
                    </div>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
                    {currentProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-3xl p-4  shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
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
                                    ₹{product.price}
                                </span>
                            </div>

                            <button
                                onClick={() => handleAddToCart()}
                                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition">
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.max(prev - 1, 1)
                            )
                        }
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
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default FilterProduct;