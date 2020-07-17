const express = require("express");
const router = express.Router();
const ProductsController = require("../../controller/Product");

router.get("/products/:page", ProductsController.index);

module.exports = router;
