const Sequelize = require("sequelize");
const connection = require("../database/database");

const Employees = connection.define("employees", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Employees.sync({ force: false });

module.exports = Employees;
