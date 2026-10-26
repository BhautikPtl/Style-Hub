const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cokieParser = require("cookie-parser");
const app = express();
dotenv.config();
const helmet = require("helmet");
const path = require("path");

const db = require("./Modules/db");

const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productroute");
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5555",
  "http://127.0.0.1:5555",
].filter(Boolean);

app.use(
  helmet({
    crossOriginOpenerPolicy: {
      policy: "same-origin-allow-popups",
    },
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cokieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
