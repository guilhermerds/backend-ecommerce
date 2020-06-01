const Sequelize = require("sequelize");
const connection = require("../database/database");
const Products = require("./Products");
const Users = require("./Users");

const Buy = connection.define("buy", {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  cpf: {
    type: Sequelize.STRING,
    references: {
      model: Users,
      key: "cpf",
      deferrable: Sequelize.INITIALLY_IMMEDIATE,
    },
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Products.hasMany(Buy);

Buy.belongsTo(Products);

Buy.sync({ force: false });

module.exports = Buy;
