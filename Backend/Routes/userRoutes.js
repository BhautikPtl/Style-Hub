const express = require("express");
const router = express.Router();
const { oderHistory } = require("../Controllers/userController");
const { IsloggedIn } = require("../middleware/authMiddleware");

router.get("/orders", IsloggedIn, oderHistory);

module.exports = router;