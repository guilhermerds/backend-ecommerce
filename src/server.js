const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./database/database");
require("./model/Messages");
connection
  .authenticate()
  .then(() => console.log("Conectou com sucesso!"))
  .catch(() => console.log("Houve um erro na conexão!"));

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.listen(8080);
