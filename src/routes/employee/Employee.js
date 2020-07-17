const express = require("express");
const router = express.Router();
const EmployeeController = require("../../controller/Employee");

router.post("/employee/new", EmployeeController.create);
router.post("/employee/login", EmployeeController.login);

module.exports = router;
