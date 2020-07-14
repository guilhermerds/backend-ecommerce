const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./database/database");
const router = require("./routes/index");
const helmet = require("helmet");

connection
  .authenticate()
  .then(() => console.log("Conectou com sucesso!"))
  .catch(() => console.log("Houve um erro na conexão!"));

app.use(morgan("dev"));

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(8080);
