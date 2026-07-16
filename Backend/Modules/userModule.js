const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    authProvider: {
      type: [String],
      enum: ["local", "google"],
      default: ["local"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    profilePicture: {
      type: String,
      default: "",
    },
    addresses: [
       {
       fullName: String, 
       mobile: String, 
       addressLine1: String, 
       city: String, 
       state: String, 
       pincode: String, 
       country: String, } 
      ],

    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

