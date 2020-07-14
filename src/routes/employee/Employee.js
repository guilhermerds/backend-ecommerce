const express = require("express");
const router = express.Router();
const EmployeeController = require("../../controller/Employee");

router.post("/employee/new", EmployeeController.create);

module.exports = router;
