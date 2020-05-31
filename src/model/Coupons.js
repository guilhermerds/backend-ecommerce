const Sequelize = require("sequelize");
const connection = require("../database/database");

const Coupons = connection.define("coupons", {
  validity: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  benefit: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Coupons.sync({ force: false });

module.exports = Coupons;
