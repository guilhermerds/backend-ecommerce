const express = require("express");
const router = express.Router();
const Shipping = require("./public/Shipping");
const User = require("./user/User");

router.use(Shipping);

router.use(User);

module.exports = router;
