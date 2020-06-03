const express = require("express");
const router = express.Router();
const ShippingController = require("../../controller/Shipping");

router.post("/transporte/frete", ShippingController.index);

router.get("/transporte/:cep", ShippingController.checkZip);

module.exports = router;
