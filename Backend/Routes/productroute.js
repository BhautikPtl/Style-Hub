const express = require("express");
const router = express.Router();
const { IsloggedIn, adminOnly } = require('../middleware/authMiddleware');

const upload = require("../Middleware/upload");
const { addProduct } = require("../Controllers/ProductController");

router.post(
    "/add-product", adminOnly,
    upload.single("productImage"),
    addProduct
);

module.exports = router;