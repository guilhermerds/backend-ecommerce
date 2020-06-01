const Sequelize = require("sequelize");
const connection = require("../database/database");
const Chats = require("./Chats");

const Messages = connection.define("messages", {
  sender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Chats.hasMany(Messages);

Messages.belongsTo(Chats);

Messages.sync({ force: false });

module.exports = Messages;
