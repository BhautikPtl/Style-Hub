const productModule = require("../Modules/productModule");
const userModule = require("../Modules/userModule");

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
      weekDials,
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

const getProducts = async (req, res) => {
  try {
    const products = await productModule.find();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatediscount = async (req, res) => {
  try {
    const { productDiscount } = req.body;
    const { id: productId } = req.params;

    const product = await productModule.findByIdAndUpdate(
      productId,
      { productDiscount },
      { returnDocument: "after" },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product discount updated successfully",
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

const filterProducts = async (req, res) => {
  try {
    const products = await productModule
      .find({ productDiscount: null })
      .sort({ productDiscount: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const product = await productModule.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await userModule.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.cart.push({
      productId: productId,
      quantity: 1,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const user = await userModule.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId,
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const increaseCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const user = await userModule.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId,
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cartItem.quantity += 1;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity increased successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const decreaseCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const user = await userModule.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId,
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId,
      );
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity decreased successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    const product = await productModule.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const user = await userModule.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const exists = user.wishlist.some(
      (item) => item.toString() === productId.toString(),
    );

    if (exists) {
      user.wishlist = user.wishlist.filter(
        (item) => item.toString() !== productId.toString(),
      );

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
      });
    }

    user.wishlist.push(productId);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Product ID:", id); // Log the product ID to verify it's being received correctly
    const product = await productModule.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
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

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productDiscount,
    } = req.body;

    const product = await productModule.findByIdAndUpdate(
      id,
      {
        productName,
        productDescription,
        productPrice,
        productCategory,
        productDiscount,
        productImage: req.file ? req.file.filename : undefined,
      },
      { new: true },
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
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
  getProducts,
  updatediscount,
  updateProduct,
  addToCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
  filterProducts,
  getProductById,
  addToFavorites,
};
