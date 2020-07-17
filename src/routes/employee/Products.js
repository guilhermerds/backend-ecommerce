const express = require("express");
const router = express.Router();
const ProductController = require("../../controller/Product");
const Middleware = require("../middleware/authorize");

router.post("/products", Middleware.employee, ProductController.create);
router.delete("/products/:id", Middleware.employee, ProductController.delete);
router.put("/products", Middleware.employee, ProductController.update);

module.exports = router;
