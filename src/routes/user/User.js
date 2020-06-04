const express = require("express");
const router = express.Router();
const UserController = require("../../controller/User");

router.post("/user/new", UserController.create);

module.exports = router;
