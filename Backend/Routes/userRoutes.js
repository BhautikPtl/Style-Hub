const express = require("express");
const router = express.Router();
const {
  AddAddress,
  placeOrder,
  cancelOrder,
  getOrders,
  updateOrderStatus,
} = require("../Controllers/userController");
const { IsloggedIn, adminOnly } = require("../middleware/authMiddleware");

router.post("/add-address", IsloggedIn, AddAddress);
router.post("/place-order", IsloggedIn, placeOrder);
router.post("/cancel-order/:id", IsloggedIn, cancelOrder);
router.get("/get-orders", IsloggedIn, getOrders);
router.post(
  "/update-status/:orderId",
  IsloggedIn,
  adminOnly,
  updateOrderStatus,
);
module.exports = router;
