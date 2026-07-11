
const productModule = require("../Modules/productModule");

const addProduct = async (req, res) => {
    try {
        const {
            productName,
            productDescription,
            productPrice,
            productCategory,
            productDiscount,
        } = req.body;

        if (
            !productName ||
            !productDescription ||
            !productPrice ||
            !productCategory
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Product image is required",
            });
        }

        const product = await productModule.create({
            productName,
            productDescription,
            productPrice,
            productCategory,
            productDiscount,
            productImage: req.file.filename,
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addProduct,
};