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
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/ProductController");

router.post(
  "/add-product",
  adminOnly,
  upload.array("productImages", 5),
  addProduct,
);

router.put(
  "/update-product/:id",
  adminOnly,
  upload.array("productImages", 5),
  updateProduct,
);

router.get("/get-admin-products", adminOnly, getProducts);

router.get("/get-products", getProducts);

router.put("/update-discount/:id", adminOnly, updatediscount);

router.get("/filter-products", filterProducts);

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

router.get("/get-product/:id", getProductById);

router.delete("/delete-product/:id", adminOnly, deleteProduct);

module.exports = router;
