const Product = require("../model/Products");

module.exports = {
  async index(req, res) {
    const { page } = req.params;
    const limit = 20;
    let offset = 0;

    if (!isNaN(page) && page >= 0) {
      offset = (page - 1) * limit;
    }

    await Product.findAndCountAll({
      limit,
      offset,
    })
      .then((products) => {
        let next = false;
        if (products.count > 0) {
          if (products.count > limit + offset) {
            next = true;
          }

          res.json({ error: false, next, products });
        } else {
          res.json({
            error: true,
            msg:
              "Não possuímos produtos com essas características, tente de outro jeito",
          });
        }
      })
      .catch(() => {
        res.json({
          error: true,
          msg: "Ocorreu um problema, tente novamente mais tarde",
        });
      });
  },
};
