const connection = require("../database/database");
const Coupons = require("./Coupons");
const Products = require("./Products");

const Actives = connection.define("actives");

Coupons.hasMany(Actives);

Actives.belongsTo(Coupons);

Products.hasMany(Actives);

Actives.belongsTo(Products);

Actives.sync({ force: false });

module.exports = Actives;
