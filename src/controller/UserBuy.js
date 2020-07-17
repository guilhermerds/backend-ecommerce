const Buy = require("../model/Buy");
const Products = require("../model/Products");

module.exports = {
  create(req, res) {
    const { id: userId } = req.user;
    const { productId, cep } = req.body;
    const status = "Aguardando confirmação de pagamento";

    if (productId == undefined || cep == undefined) {
      return res.json({
        error: true,
        msg: "Informe o cep e a identificação do produto",
      });
    }

    Buy.create({ productId, userId, status, cep })
      .then(() => {
        Products.findByPk(productId)
          .then((product) => {
            const amount = product.amount - 1;

            Products.update({ amount }, { where: { id: productId } })
              .then(() => {
                return res.json({
                  error: false,
                  msg: "Pedido realizado com sucesso",
                });
              })
              .catch(() => {
                return res.json({
                  error: true,
                  msg:
                    "Ocorreu um erro com o pedido, tente novamente mais tarde",
                });
              });
          })
          .catch(() => {
            return res.json({
              error: true,
              msg: "Ocorreu um erro com o pedido, tente novamente mais tarde",
            });
          });
      })
      .catch(() => {
        res.json({
          error: true,
          msg: "Ocorreu um erro com o pedido, tente novamente mais tarde",
        });
      });
  },

  show(req, res) {
    const { id: userId } = req.user;

    Buy.findAll({ where: { userId } })
      .then((buy) => {
        return res.json({ error: false, products: buy });
      })
      .catch(() => {
        return res.json({
          error: true,
          msg: "Ocorreu um erro na exibição dos seus produtos",
        });
      });
  },
};
