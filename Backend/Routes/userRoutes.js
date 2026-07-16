const express = require("express");
const router = express.Router();
const { AddAddress } = require("../Controllers/userController");
const { IsloggedIn } = require("../middleware/authMiddleware");


router.post("/add-address", IsloggedIn, AddAddress);



module.exports = router;