const cookie = require("cookie");

module.exports = {
  async create(req, res) {
    const { productId } = req.body;

    if (req.headers.cookie == undefined) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("cart", String([productId]), { path: "/" })
      );
      return res.json({ error: false, msg: "Adicionado ao carrinho" });
    }

    const cookies = cookie.parse(req.headers.cookie).cart.split(",");

    if (!cookies.includes(productId)) {
      const newCookies = [...cookies, productId];

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("cart", String(newCookies), { path: "/" })
      );

      return res.json({
        error: false,
        msg: "Adicionado ao carrinho",
      });
    }
    res.json({ error: true, msg: "Esse produto já esta no carrinho" });
  },

  show(req, res) {
    //res.json({ cookie: req.cookies });
    if (req.headers.cookie == undefined) {
      return res.json({
        error: true,
        msg: "Não há items adicionados ao carrinho",
      });
    }

    const cookies = cookie.parse(req.headers.cookie).cart.split(",");
    const convertedCookies = cookies.map((cookie) => parseInt(cookie));

    res.json({ error: false, products: convertedCookies });
  },

  delete(req, res) {
    const { productId } = req.params;
    if (req.headers.cookie == undefined) {
      return res.json({
        error: true,
        msg: "Não há items adicionados ao carrinho",
      });
    }

    const cookies = cookie.parse(req.headers.cookie).cart.split(",");

    const newCookies = cookies.filter((cookie) => cookie !== String(productId));

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("cart", String(newCookies), { path: "/" })
    );

    res.json({ error: false, msg: "Excluído com sucesso" });
  },
};
