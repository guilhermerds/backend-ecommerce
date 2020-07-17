const Sequelize = require("sequelize");
const connection = require("../database/database");
const Employees = require("./Employees");
const Categories = require("./Categories");

const Products = connection.define("products", {
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

Employees.hasMany(Products);

Products.belongsTo(Employees);

Categories.hasMany(Products);

Products.belongsTo(Categories);

Products.sync({ force: false });

module.exports = Products;
