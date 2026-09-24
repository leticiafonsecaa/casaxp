import { Router } from "express";
import db from "./database";

const router = Router();

// Listar recompensas
router.get("/", (req, res) => {
  const recompensas = db
    .prepare("SELECT * FROM recompensas")
    .all();

  res.json(recompensas);
});

// Criar recompensa
router.post("/", (req, res) => {
  const { nome, descricao, custo_xp } = req.body;

  if (!nome || custo_xp === undefined) {
    return res.status(400).json({
      erro: "Nome e custo em XP são obrigatórios."
    });
  }

  const resultado = db
    .prepare(`
      INSERT INTO recompensas (nome, descricao, custo_xp)
      VALUES (?, ?, ?)
    `)
    .run(nome, descricao || null, custo_xp);

  const recompensa = db
    .prepare("SELECT * FROM recompensas WHERE id = ?")
    .get(resultado.lastInsertRowid);

  res.status(201).json(recompensa);
});

// Excluir recompensa
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const resultado = db
    .prepare("DELETE FROM recompensas WHERE id = ?")
    .run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      erro: "Recompensa não encontrada."
    });
  }

  res.json({
    mensagem: "Recompensa excluída com sucesso."
  });
});

export default router;