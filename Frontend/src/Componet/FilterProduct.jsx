import { useState } from "react";
import Herobg from "../assets/heroImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faAngleDown,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function FilterProduct(props) {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const [products, setProducts] = useState([]);

  const { isLogged, user, setUser } = props;

  const navigate = useNavigate();
  const isLoggedIn = isLogged;

  const CheckLogin = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      setUser(data.details);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    if (isLoggedIn) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/product/add-to-cart/${productId}`,
          {},
          {
            withCredentials: true,
          },
        );

        await CheckLogin(); // Refresh user data after adding to cart
      } catch (error) {
        console.log("Response Error:", error.response?.data);
        console.log("Status:", error.response?.status);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleAddToFavorites = async (productId) => {
    if (isLoggedIn) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/product/add-to-favorites/${productId}`,
          {},
          {
            withCredentials: true,
          },
        );
        await CheckLogin(); // Refresh user data after adding to favorites
      } catch (error) {
        console.log("Response Error:", error.response?.data);
        console.log("Status:", error.response?.status);
        console.log(error);
      }
    } else {
      navigate("/login");
    }
  };

  const isWishlisted = (productId) => {
    return user?.wishlist?.some((item) => {
      if (!item) return false;

      const id = item._id ? item._id.toString() : item.toString();

      return id === productId.toString();
    });
  };

  const filterProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/filter-products",
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
    }
  };

  const isProductInCart = (productId) => {
    return user?.cart?.some((item) => item.productId?._id === productId);
  };

  useEffect(() => {
    filterProducts();
    CheckLogin();
  }, []);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      category === "all" || product.productCategory === category;

    const priceMatch = Number(product.productPrice) <= Number(price) * 20;

    return categoryMatch && priceMatch;
  });

  const itemsPerPage = 4;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="w-full mt-6">
      {/* Mobile Filter Button */}
      <div className=" mb-3 relative">
        <button
          onClick={() => setIsFilter(!isFilter)}
          className=" m-auto px-4 py-2 bg-black text-white rounded-xl"
        >
          {isFilter ? (
            <FontAwesomeIcon icon={faXmark} />
          ) : (
            <>
              Filter
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
            </>
          )}
        </button>

        {isFilter && (
          <div className="absolute left-0 top-14 z-50 w-72 rounded-3xl border border-gray-100 bg-white shadow-xl p-5">
            <h2 className="font-bold text-lg mb-4">Filters</h2>

            {/* Category */}
            <div className="p-4 rounded-2xl bg-zinc-100">
              <h3 className="font-semibold mb-3">Category</h3>

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
              <h3 className="font-semibold mb-3">Price</h3>

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

              <p className="mt-2 text-sm text-gray-600">Up To ₹{price * 20}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className="relative bg-white   rounded-3xl p-4  shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${product.productImage}`}
                  alt={product.productName}
                  className="w-full h-80 object-cover object-top hover:scale-105 transition duration-300"
                />
              </div>

              <h3 className="font-semibold mt-4">{product.productName}</h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-lg font-bold">
                  ₹{product.productPrice}
                </span>
              </div>

              <button
                onClick={() => {
                  if (isProductInCart(product._id)) {
                    navigate("/cart");
                  } else {
                    handleAddToCart(product._id);
                  }
                }}
                className="w-full mt-4 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
              >
                {isProductInCart(product._id) ? "Go to Cart" : "Add To Cart"}
              </button>
              <button
                onClick={() => handleAddToFavorites(product._id)}
                className="absolute top-5 right-5 bg-black text-2xl p-1 rounded-full transition"
              >
                <FontAwesomeIcon
                  icon={isWishlisted(product._id) ? faHeart : faHeartRegular}
                  className={
                    isWishlisted(product._id) ? "text-red-500" : "text-white"
                  }
                />
              </button>
            </div>
          ))}
        </div>
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
    </div>
  );
}

export default FilterProduct;
