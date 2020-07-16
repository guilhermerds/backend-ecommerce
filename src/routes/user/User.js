const express = require("express");
const router = express.Router();
const UserController = require("../../controller/User");
const Middleware = require("../middleware/authorize");

router.post("/user/new", UserController.create);
router.post("/user/login", UserController.login);
router.put("/user", Middleware.user, UserController.update);

module.exports = router;
