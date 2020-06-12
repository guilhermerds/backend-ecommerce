const express = require("express");
const router = express.Router();
const ProductsController = require("../../controller/Product");

router.get("/products", ProductsController.index);

module.exports = router;
