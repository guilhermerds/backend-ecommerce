const express = require("express");
const router = express.Router();
const UserController = require("../../controller/User");

router.post("/user/new", UserController.create);

router.post("/user/login", UserController.login);

module.exports = router;
