const express = require("express");
const router = express.Router();
const Shipping = require("./public/Shipping");

router.use(Shipping);

module.exports = router;
