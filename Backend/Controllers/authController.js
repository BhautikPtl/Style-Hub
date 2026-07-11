const userModule = require('../Modules/userModule');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require("nodemailer");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModule.create({
        username,
        name,
        email,
        password: hashedPassword,
        role
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000  // 1 day //1 * 60 * 1000 1 minute  
    });

    const userWithoutPassword = await userModule.findById(newUser._id).select("-password");

    res.status(201).json({
        message: "User registered successfully",
        newUser: userWithoutPassword
    });

}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ message: "Username must be between 6 and 20 characters long" });
    }
    if (password.length < 6 || password.length > 20) {
        return res.status(400).json({ message: "Password must be between 6 and 20 characters long" });
    }

    const user = await userModule.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000  // 1 day //1 * 60 * 1000 1 minute  
    });
    const userWithoutPassword = await userModule.findById(user._id).select("-password");
    res.status(200).json({
        message: "Logged in successfully",
        user: userWithoutPassword
    })
}

const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Credential is required"
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        const {
            sub,
            email,
            name,
            picture,
            email_verified
        } = payload;

        let user = await userModule.findOne({ email });

        if (!user) {

            const count = await userModule.countDocuments();
            const role = count === 0 ? "admin" : "user";

            user = await userModule.create({
                username: email.split("@")[0],
                name,
                email,
                role,
                profilePicture: picture,
                googleId: sub,
                authProvider: "google"
            });
        }

        if (!user.authProvider.includes("google")) {
            user.authProvider.push("google");
        }

        if (!user.profilePicture) {
            user.profilePicture = picture;
        }

        await user.save();

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        const userWithoutPassword = await userModule
            .findById(user._id)
            .select("-password");

        res.status(200).json({
            message: "Google login successful",
            user: userWithoutPassword
        });

    } catch (error) {
        console.log(error);

        res.status(401).json({
            message: "Invalid Google Token"
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModule.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "5m" }
        );

        const resetLink = `${process.env.FRONTEND_URL}/set-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("Sending email to:", user.email);
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset Your Password",
            html:  `
                    <div style="max-width:650px;margin:40px auto;font-family:Segoe UI,Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

                    <div style="padding:30px 20px;text-align:center;background:#ffffff;border-bottom:1px solid #f1f1f1;">
                        
                        <img
                        src="https://ik.imagekit.io/e3odg5wvz/StyleHub%20Logo/Logo.png?updatedAt=1783703230738"
                        alt="StyleHub Logo"
                        style="height:80px;width:auto;"
                        />

                        <h1 style="margin:15px 0 0;color:#111827;font-size:32px;font-weight:700;">
                        StyleHub
                        </h1>

                        <p style="margin-top:8px;color:#6b7280;font-size:14px;">
                        Fashion That Defines You
                        </p>

                    </div>

                    <div style="padding:40px 35px;">

                        <h2 style="margin:0;color:#111827;font-size:28px;">
                        Reset Your Password
                        </h2>

                        <p style="margin-top:20px;color:#4b5563;line-height:1.7;font-size:15px;">
                        Hello,
                        </p>

                        <p style="color:#4b5563;line-height:1.7;font-size:15px;">
                        We received a request to reset the password for your StyleHub account.
                        Click the button below to create a new password and regain access to your account.
                        </p>

                        <div style="text-align:center;margin:35px 0;">

                        <a
                            href="${resetLink}"
                            style="
                            background:#000000;
                            color:#ffffff;
                            text-decoration:none;
                            padding:16px 34px;
                            border-radius:12px;
                            display:inline-block;
                            font-size:15px;
                            font-weight:600;
                            "
                        >
                            Reset Password
                        </a>

                        </div>

                        <div
                        style="
                            background:#f9fafb;
                            border:1px solid #e5e7eb;
                            border-radius:12px;
                            padding:16px;
                            margin-top:20px;
                        "
                        >
                        <p style="margin:0;color:#374151;font-size:14px;">
                            ⏳ This password reset link will expire in
                            <strong>5 minute</strong>.
                        </p>
                        </div>

                        <p style="margin-top:30px;color:#6b7280;line-height:1.7;font-size:14px;">
                        If you did not request a password reset, you can safely ignore this email.
                        Your password will remain unchanged.
                        </p>

                        <p style="margin-top:25px;color:#6b7280;font-size:14px;">
                        Thank you,<br/>
                        <strong>StyleHub Team</strong>
                        </p>

                    </div>

                    <div
                        style="
                        background:#111827;
                        padding:20px;
                        text-align:center;
                        "
                    >
                        <p style="margin:0;color:#d1d5db;font-size:13px;">
                        © 2026 StyleHub. All Rights Reserved.
                        </p>

                        <p style="margin-top:8px;color:#9ca3af;font-size:12px;">
                        Secure Account Recovery Service
                        </p>
                    </div>

                    </div>
                    `
              
            
        });

    res.status(200).json({
        message: "Password reset email sent",
    });
} catch (error) {
    console.log(error);

    res.status(500).json({
        message: "Something went wrong",
    });
}
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModule.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        user.password = hashedPassword;

        if (!user.authProvider.includes("local")) {
            user.authProvider.push("local");
        }

        await user.save();

        res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(400).json({
            message: "Invalid or expired link",
        });
    }
};

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

const addproduct = (req, res) => {
    res.status(200).json({ message: "Welcome to the add product page" });
}

const showproduct = (req, res) => {
    res.status(200).json({ message: "Welcome to the show product page" });
}

module.exports = { register, logout, me, dashboard, adminDashboard, login, googleLogin, forgotPassword, resetPassword, addproduct, showproduct };