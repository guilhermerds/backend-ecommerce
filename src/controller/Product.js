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

  create(req, res) {
    const { id: employeeId } = req.employee;
    const { amount, size, name, description, price, categoryId } = req.body;

    if (
      amount == undefined ||
      size == undefined ||
      name == undefined ||
      description == undefined ||
      price == undefined ||
      categoryId == undefined
    ) {
      return res.json({
        error: true,
        msg: "Esta faltando algum dado, tente novamente",
      });
    }

    Product.create({
      amount,
      size,
      name,
      description,
      price,
      employeeId,
      categoryId,
    })
      .then(() => {
        return res.json({
          error: false,
          msg: "Produto cadastrado com sucesso",
        });
      })
      .catch(() => {
        return res.json({
          error: true,
          msg: "Ocorreu um erro no cadastro, tente novamente mais tarde",
        });
      });
  },

  update(req, res) {
    const { name, amount, size, price, description, categoryId, id } = req.body;

    if (id == undefined) {
      return res.json({
        error: true,
        msg: "Esta faltando o código do produto",
      });
    }

    let fields;

    if (name != undefined) {
      fields = { ...fields, name };
    }

    if (amount != undefined) {
      fields = { ...fields, amount };
    }

    if (size != undefined) {
      fields = { ...fields, size };
    }

    if (price != undefined) {
      fields = { ...fields, price };
    }

    if (description != undefined) {
      fields = { ...fields, description };
    }

    if (categoryId != undefined) {
      fields = { ...fields, categoryId };
    }

    if (fields != undefined) {
      Product.update({ ...fields }, { where: { id } })
        .then(() => {
          return res.json({
            error: false,
            msg: "Atualizado com sucesso",
          });
        })
        .catch(() => {
          return res.json({
            error: true,
            msg: "Ocorreu um erro na atualização",
          });
        });
    } else {
      return res.json({
        error: true,
        msg: "Informe um dado para que seja atualizado",
      });
    }
  },

  delete(req, res) {
    const { id } = req.params;

    Product.destroy({ where: { id } })
      .then(() => {
        return res.json({ error: false, msg: "Excluído com sucesso" });
      })
      .catch(() => {
        return res.json({
          error: true,
          msg: "Ocorreu um erro, tente novamente mais tarde",
        });
      });
  },
};
