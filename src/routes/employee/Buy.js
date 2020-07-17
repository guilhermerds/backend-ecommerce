const express = require("express");
const router = express.Router();
const EmployeeBuyController = require("../../controller/EmployeeBuy");
const Middleware = require("../middleware/authorize");

router.get("/buy/employee", Middleware.employee, EmployeeBuyController.show);

module.exports = router;
