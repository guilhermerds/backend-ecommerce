const User = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

      await User.create({
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
  async login(req, res) {
    const { email, pass } = req.body;

    await User.findOne({ where: { email } }).then((user) => {
      if (user != undefined) {
        const correct = bcrypt.compareSync(pass, user.pass);

        if (correct) {
          const token = jwt.sign(
            { user: { cpf: user.cpf, id: user.id } },
            process.env.JWT_PASS
          );
          res.json({ error: false, token });
        } else {
          res.json({ error: true, msg: "Email ou senha errados" });
        }
      } else {
        res.json({ error: true, msg: "Email ou senha errados" });
      }
    });
  },
};
