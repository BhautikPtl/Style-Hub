const userModule = require("../Modules/userModule");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const oderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModule.findById(userId).populate("orders");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ orders: user.orders });
  }
    catch (error) {

    console.error("Error fetching order history:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = { oderHistory };