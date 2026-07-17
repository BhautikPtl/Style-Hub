const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },

            quantity: {
                type: Number,
                required: true,
            },

            price: {
                type: Number,
                required: true,
            },

            totalPrice: {
                type: Number,
                required: true,
            },
        },
    ],
    address: {
        fullName: String,
        mobile: String,
        addressLine1: String,
        city: String,
        state: String,
        pincode: String,
        country: String,
    },

    subtotal: Number,

    sgst: Number,

    cgst: Number,

    igst: Number,

    shippingCharge: Number,

    totalAmount: Number,

    paymentMethod: {
        type: String,
        enum: ["COD", "RAZORPAY"],
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
    },

    orderStatus: {
        type: String,
        enum: [
            "Placed",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ],
        default: "Placed",
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);