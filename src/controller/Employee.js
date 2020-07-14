const Employee = require("../model/Employees");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  async create(req, res) {
    const { name, email, pass } = req.body;

    if (
      name != undefined &&
      name != "" &&
      email != undefined &&
      email != "" &&
      pass != undefined &&
      pass != ""
    ) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(pass, salt);

      await Employee.create({
        name,
        email,
        pass: hash,
      })
        .then(() => {
          res.json({ error: false, msg: "Funcionário cadastrado com sucesso" });
        })
        .catch(() => {
          res.json({
            error: true,
            msg: "Ocorreu um erro, tente novamente mais tarde",
          });
        });
    } else {
      res.json({ error: true, msg: "Um ou mais dados estão faltando" });
    }
  },
  async login(req, res) {
    const { email, pass } = req.body;

    await Employee.findOne({ where: { email } }).then((employee) => {
      if (employee != undefined) {
        const correct = bcrypt.compareSync(pass, employee.pass);

        if (correct) {
          const token = jwt.sign(
            { employee: { email: employee.email, id: employee.id } },
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
