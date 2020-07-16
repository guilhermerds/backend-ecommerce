const express = require("express");
const router = express.Router();
const Shipping = require("./public/Shipping");
const User = require("./user/User");
const Product = require("./public/Products");
const Employee = require("./employee/Employee");
const Cart = require("./public/Cart");
const Buy = require("./user/Buy");

router.use(Product);
router.use(Shipping);
router.use(User);
router.use(Employee);
router.use(Cart);
router.use(Buy);

module.exports = router;
