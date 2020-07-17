const Buy = require("../model/Buy");
const { Op } = require("sequelize");

module.exports = {
  show(req, res) {
    Buy.findAll({
      where: {
        status: {
          [Op.or]: ["Pedido em separação", "Pedido separado para envio"],
        },
      },
    })
      .then((products) => {
        res.json({ error: false, products });
      })
      .catch(() => {
        return res.json({
          error: true,
          msg: "Ocorreu um erro, tente novamente mais tarde",
        });
      });
  },
};
