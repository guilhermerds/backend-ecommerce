const express = require("express");
const router = express.Router();
const UserBuy = require("../../controller/UserBuy");
const Middleware = require("../middleware/authorize");

router.post("/buy", Middleware.user, UserBuy.create);
router.get("/buy", Middleware.user, UserBuy.show);

module.exports = router;
