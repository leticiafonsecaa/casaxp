import { Router } from "express";
import db from "./database";

const router = Router();

// Listar usuários
router.get("/", (req, res) => {
  const usuarios = db
    .prepare("SELECT * FROM usuarios")
    .all();

  res.json(usuarios);
});

// Criar usuário
router.post("/", (req, res) => {
  const { nome, tipo } = req.body;

  if (!nome || !tipo) {
    return res.status(400).json({
      erro: "Nome e tipo são obrigatórios."
    });
  }

  const resultado = db
    .prepare(
      "INSERT INTO usuarios (nome, tipo) VALUES (?, ?)"
    )
    .run(nome, tipo);

  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE id = ?")
    .get(resultado.lastInsertRowid);

  res.status(201).json(usuario);
});

// Excluir usuário
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const resultado = db
    .prepare("DELETE FROM usuarios WHERE id = ?")
    .run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  res.json({
    mensagem: "Usuário excluído com sucesso."
  });
});

// Buscar usuário por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE id = ?")
    .get(id);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  res.json(usuario);
});

export default router;