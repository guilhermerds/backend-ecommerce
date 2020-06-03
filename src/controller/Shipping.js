const Correios = require("node-correios");
const shipping = new Correios();
require("dotenv").config();

module.exports = {
  async index(req, res) {
    const { cep, weight, height, width, length, price } = req.body;

    const arg = {
      nCdEmpresa: process.env.CR_ENTE,
      sDsSenha: process.env.CR_PASS,
      nCdServico: "04510,04014",
      sCepOrigem: "13480013",
      sCepDestino: cep,
      nVlPeso: weight,
      nCdFormat: 1,
      nVlAltura: height,
      nVlLargura: width,
      nVlComprimento: length,
      nVlValorDeclarado: price,
    };

    await shipping
      .calcPrecoPrazo(arg)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  async checkZip(req, res) {
    const { cep } = req.params;

    shipping
      .consultaCEP({ cep })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
