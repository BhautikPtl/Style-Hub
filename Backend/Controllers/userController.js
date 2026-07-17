const userModule = require("../Modules/userModule");
const Order = require("../Modules/orderModule");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AddAddress = async (req, res) => {
  try {
    const user = await userModule.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.addresses.push({
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      addressLine1: req.body.addressLine1,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.zipCode,
      country: "India",
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    const user = await userModule
      .findById(req.userId)
      .populate("cart.productId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const subtotal = user.cart.reduce(
      (total, item) => total + item.productId.productPrice * item.quantity,
      0,
    );

    const isGujarat = address.state.toLowerCase() === "gujarat";

    const sgst = isGujarat ? subtotal * 0.09 : 0;

    const cgst = isGujarat ? subtotal * 0.09 : 0;

    const igst = !isGujarat ? subtotal * 0.18 : 0;

    const shippingCharge = isGujarat ? 0 : 100;

    const totalAmount = subtotal + sgst + cgst + igst + shippingCharge;

    const products = user.cart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.productPrice,
      totalPrice: item.productId.productPrice * item.quantity,
    }));
    const order = await Order.create({
      userId: user._id,
      products,
      address,

      subtotal,
      sgst,
      cgst,
      igst,

      shippingCharge,
      totalAmount: totalAmount.toFixed(0),

      paymentMethod,

      paymentStatus: paymentMethod === "COD" ? "Pending" : "Paid",
    });

    user.orders.push(order._id);

    user.cart = [];

    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById({ _id: orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  AddAddress,
  placeOrder,
  cancelOrder,
  getOrders,
  updateOrderStatus,
};
