const jwt = require("jsonwebtoken");

module.exports = {
  async user(req, res, next) {
    const token = req.headers["x-access-token"];

    await jwt.verify(token, process.env.JWT_PASS, (error, decoded) => {
      if (error) {
        return res.json({
          error: true,
          msg:
            "Não foi possível autorizar seu acesso, por favor faça o login novamente",
        });
      } else {
        if (decoded.user != undefined) {
          req.user = { ...decoded.user };
          return next();
        } else {
          res.json({
            error: true,
            msg: "Você não possui autorização para acessar esta página",
          });
        }
      }
    });
  },
  async employee(req, res, next) {
    const token = req.headers["x-access-token"];

    await jwt.verify(token, process.env.JWT_PASS, (error, decoded) => {
      if (error) {
        return res.json({
          error: true,
          msg:
            "Não foi possível autorizar seu acesso, por favor faça o login novamente",
        });
      } else {
        if (decoded.employee != undefined) {
          req.employee = { ...decoded.employee };
          return next();
        } else {
          res.json({
            error: true,
            msg: "Você não possui autorização para acessar esta página",
          });
        }
      }
    });
  },
};
