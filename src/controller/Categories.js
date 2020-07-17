const Categories = require("../model/Categories");

module.exports = {
  show(req, res) {
    Categories.findAll().then((categories) => {
      res.json(
        categories.map((category) => ({
          id: category.id,
          title: category.title,
        }))
      );
    });
  },

  create(req, res) {
    const { title } = req.body;

    Categories.create({ title })
      .then(() => {
        res.json({ error: false, msg: "Categoria cadastrada com sucesso" });
      })
      .catch(() => {
        res.json({
          error: true,
          msg: "Não foi possível cadastrar a categoria",
        });
      });
  },

  delete(req, res) {
    const { id } = req.params;

    Categories.destroy({ where: { id } })
      .then(() => {
        res.json({ error: false, msg: "Excluído com sucesso" });
      })
      .catch(() => {
        res.json({ error: true, msg: "Não foi possível excluír a categoria" });
      });
  },

  update(req, res) {
    const { title, id } = req.body;

    if (title == undefined || id == undefined || isNaN(id)) {
      return res.json({
        error: true,
        msg: "Informe o titulo e a identificação da categoria",
      });
    }

    Categories.update({ title }, { where: { id } })
      .then(() => {
        return res.json({
          error: false,
          msg: "Categoria atualizada com sucesso",
        });
      })
      .catch(() => {
        return res.json({
          error: true,
          msg: "Ocorreu um erro, tente novamente mais tarde",
        });
      });
  },
};
