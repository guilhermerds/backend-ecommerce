const express = require("express");
const router = express.Router();
const CategoriesController = require("../../controller/Categories");
const Middleware = require("../middleware/authorize");

router.get("/categories", CategoriesController.show);
router.post("/categories", Middleware.employee, CategoriesController.create);
router.delete(
  "/categories/:id",
  Middleware.employee,
  CategoriesController.delete
);
router.put("/categories", Middleware.employee, CategoriesController.update);

module.exports = router;
