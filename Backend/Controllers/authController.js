const express = require('express');
const userModule = require('../Modules/userModule');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {

    const { username, name, email, password } = req.body;

    if (!username || !name || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (email.includes("@") === false || email.includes(".") === false) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ message: "Username must be between 6 and 20 characters long" });
    }
    if (name.length < 3 || name.length > 20) {
        return res.status(400).json({ message: "Name must be between 6 and 20 characters long" });
    }
    if (password.length < 6 || password.length > 20) {
        return res.status(400).json({ message: "Password must be between 6 and 20 characters long" });
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).json({ message: "Username can only contain letters and numbers" });
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).json({
            message: "Name can only contain letters"
        });
    }

    const existingUser = await userModule.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: "this user is already exists" });
    }

    const count = await userModule.countDocuments();
    count === 0 ? role = "admin" : role = "user";

    const newUser = await userModule.create({
        username,
        name,
        email,
        password,
        role
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000  // 1 day // 1 * 60 * 1000 1 minute  
    });

    res.status(201).json({
        message: "User registered successfully",
        newUser
    });

}


const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
}

const me = async (req, res) => {
    const user = await userModule.findById(req.userId).select("-password");
    res.status(200).json({ details: user });
}
const dashboard = (req, res) => {
    res.status(200).json({ message: "Welcome to the dashboard" });
}

const adminDashboard = (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard" });
}

module.exports = { register, logout, me, dashboard, adminDashboard };