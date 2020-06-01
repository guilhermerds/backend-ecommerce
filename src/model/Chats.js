const Sequelize = require("sequelize");
const connection = require("../database/database");
const Employees = require("./Employees");
const Users = require("./Users");

const Chats = connection.define("chats", {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Employees.hasMany(Chats);

Chats.belongsTo(Employees);

Users.hasMany(Chats);

Chats.belongsTo(Users);

Chats.sync({ force: false });

module.exports = Chats;
