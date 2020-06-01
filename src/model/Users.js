const Sequelize = require("sequelize");
const connection = require("../database/database");

const Users = connection.define("users", {
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
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

Users.sync({ force: false });

module.exports = Users;
