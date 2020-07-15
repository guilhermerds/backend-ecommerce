const express = require("express");
const router = express.Router();
const CartController = require("../../controller/Cart");

router.post("/cart", CartController.create);
router.get("/cart", CartController.show);
router.delete("/cart/:productId", CartController.delete);

module.exports = router;
