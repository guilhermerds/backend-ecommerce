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

  update(req, res) {
    const { id } = req.user;
    const { name, email, pass, confirmation } = req.body;

    User.findByPk(id)
      .then((user) => {
        if (user != undefined) {
          const correct = bcrypt.compareSync(confirmation, user.pass);

          if (correct) {
            let fields;

            if (name != undefined) {
              fields = { ...fields, name };
            }

            if (email != undefined) {
              fields = { ...fields, email };
            }

            if (pass != undefined) {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(pass, salt);
              fields = { ...fields, pass: hash };
            }

            if (fields != undefined) {
              User.update({ ...fields }, { where: { id } })
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
          } else {
            return res.json({
              error: true,
              msg: "A senha que informou está incorreta",
            });
          }
        } else {
          return res.json({ error: true, msg: "Usuário não encontrado" });
        }
      })
      .catch((err) => {
        return res.json({
          error: true,
          msg: "Ocorreu um erro, tente novamente mais tarde",
          id,
          err,
        });
      });
  },
};
