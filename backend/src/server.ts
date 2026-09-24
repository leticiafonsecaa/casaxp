import cors from "cors";
import express from "express";

import "./database/init";

import conclusoesRouter from "./conclusoes";
import recompensasRouter from "./recompensas";
import resgatesRouter from "./resgates";
import tarefasRouter from "./tarefas";
import usuariosRouter from "./usuarios";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRouter);
app.use("/tarefas", tarefasRouter);
app.use("/conclusoes", conclusoesRouter);
app.use("/recompensas", recompensasRouter);
app.use("/resgates", resgatesRouter);

app.get("/", (req, res) => {
  res.json({
    mensagem: "CasaXP API funcionando! 🚀"
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`CasaXP API rodando em http://localhost:${PORT}`);
});