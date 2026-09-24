import { Router } from "express";
import db from "./database";

const router = Router();

// Listar tarefas
router.get("/", (req, res) => {
  const tarefas = db
    .prepare(`
        SELECT
            tarefas.id,
            tarefas.titulo,
            tarefas.descricao,
            tarefas.pontos,
            tarefas.usuario_id,
            usuarios.nome AS usuario
        FROM tarefas
        LEFT JOIN usuarios
            ON tarefas.usuario_id = usuarios.id
    `)
    .all();

  res.json(tarefas);
});

// Criar tarefa
router.post("/", (req, res) => {
  const { titulo, descricao, pontos, usuario_id } = req.body;

  if (!titulo || pontos === undefined) {
    return res.status(400).json({
      erro: "Título e pontos são obrigatórios."
    });
  }

  const resultado = db
    .prepare(`
      INSERT INTO tarefas (titulo, descricao, pontos, usuario_id)
      VALUES (?, ?, ?, ?)
    `)
    .run(titulo, descricao || null, pontos, usuario_id || null);

  const tarefa = db
    .prepare("SELECT * FROM tarefas WHERE id = ?")
    .get(resultado.lastInsertRowid);

  res.status(201).json(tarefa);
});

// Excluir tarefa
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const resultado = db
    .prepare("DELETE FROM tarefas WHERE id = ?")
    .run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      erro: "Tarefa não encontrada."
    });
  }

  res.json({
    mensagem: "Tarefa excluída com sucesso."
  });
});

export default router;