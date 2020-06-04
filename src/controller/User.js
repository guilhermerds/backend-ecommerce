const User = require("../model/Users");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    const { cpf, name, email, pass } = req.body;

    if (
      cpf != undefined &&
      cpf != "" &&
      name != undefined &&
      name != "" &&
      email != undefined &&
      email != "" &&
      pass != undefined &&
      pass != ""
    ) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pass, salt);

      User.create({
        cpf,
        name,
        email,
        pass: hash,
      })
        .then(() => {
          res.json({ error: false, msg: "Usuário cadastrado com sucesso" });
        })
        .catch((err) => {
          if (err.fields["users.cpf"] != undefined) {
            res.json({ error: true, msg: "CPF já cadastrado" });
          } else if (err.fields["users.email"] != undefined) {
            res.json({ error: true, msg: "Email já cadastrado" });
          } else {
            res.json({
              error: true,
              msg: "Ocorreu um erro, tente novamente mais tarde",
            });
          }
        });
    } else {
      res.json({ error: true, msg: "Um ou mais dados estão faltando" });
    }
  },
};
