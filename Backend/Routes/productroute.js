const express = require("express");
const router = express.Router();
const { IsloggedIn, adminOnly } = require("../middleware/authMiddleware");

const upload = require("../Middleware/upload");
const {
  addProduct,
  getProducts,
  updatediscount,
  filterProducts,
  addToCart,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  addToFavorites,
} = require("../Controllers/ProductController");

router.post(
  "/add-product",
  adminOnly,
  upload.single("productImage"),
  addProduct,
);

router.get("/get-products", adminOnly, getProducts);

router.put("/update-discount/:id", adminOnly, updatediscount);

router.get("/filter-products", adminOnly, filterProducts);

router.post("/add-to-cart/:productId", IsloggedIn, addToCart);

router.post("/remove-from-cart/:productId", IsloggedIn, removeFromCart);

router.post(
  "/increase-cart-quantity/:productId",
  IsloggedIn,
  increaseCartQuantity,
);

router.post(
  "/decrease-cart-quantity/:productId",
  IsloggedIn,
  decreaseCartQuantity,
);

router.post("/add-to-favorites/:productId", IsloggedIn, addToFavorites);

module.exports = router;
