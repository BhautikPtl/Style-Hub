const userModule = require("../Modules/userModule");
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





module.exports = { AddAddress };