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
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Products.hasMany(Buy);

Buy.belongsTo(Products);

Users.hasMany(Buy);

Buy.belongsTo(Users);

Buy.sync({ force: false });

module.exports = Buy;
