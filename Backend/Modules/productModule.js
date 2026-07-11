const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
        },

        productDescription: {
            type: String,
            required: true,
        },

        productPrice: {
            type: Number,
            required: true,
        },

        productCategory: {
            type: String,
            required: true,
        },

        productDiscount: {
            type: Number,
            default: 0,
        },

        productImage: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Product",
    productSchema
);