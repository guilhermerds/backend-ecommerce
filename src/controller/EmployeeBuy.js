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
  update(req, res) {
    const { id, statusId } = req.body;

    if (
      (id == undefined && !isNaN(id)) ||
      (statusId == undefined && !isNaN(statusId))
    ) {
      return res.json({
        error: true,
        msg: "Informe a identificação da compra e seu status",
      });
    }

    let status;

    switch (statusId) {
      case 1:
        status = "Pedido separado para envio";
        break;
      case 2:
        status = "Pedido enviado";
        break;
      default:
        return res.json({
          error: true,
          msg: "Código de status inválido, tente outro",
        });
    }

    Buy.update({ status }, { where: { id } })
      .then(() => {
        return res.json({ error: false, msg: "Atualizado com sucesso" });
      })
      .catch(() => {
        return res.json({ error: true, msg: "Ocorreu um erro na atualização" });
      });
  },
};
