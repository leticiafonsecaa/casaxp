import { Router } from "express";
import db from "./database";

const router = Router();

// Listar conclusões
router.get("/", (req, res) => {
  const conclusoes = db
    .prepare(`
      SELECT
        conclusoes.id,
        conclusoes.tarefa_id,
        tarefas.titulo AS tarefa,
        conclusoes.usuario_id,
        usuarios.nome AS usuario,
        conclusoes.concluida_em,
        conclusoes.aprovada
      FROM conclusoes
      JOIN tarefas
        ON conclusoes.tarefa_id = tarefas.id
      JOIN usuarios
        ON conclusoes.usuario_id = usuarios.id
    `)
    .all();

  res.json(conclusoes);
});

// Registrar tarefa como concluída
router.post("/", (req, res) => {
  const { tarefa_id, usuario_id } = req.body;

  if (!tarefa_id || !usuario_id) {
    return res.status(400).json({
      erro: "Tarefa e usuário são obrigatórios."
    });
  }

  const resultado = db
    .prepare(`
      INSERT INTO conclusoes (tarefa_id, usuario_id)
      VALUES (?, ?)
    `)
    .run(tarefa_id, usuario_id);

  const conclusao = db
    .prepare(`
      SELECT
        conclusoes.id,
        conclusoes.tarefa_id,
        tarefas.titulo AS tarefa,
        conclusoes.usuario_id,
        usuarios.nome AS usuario,
        conclusoes.concluida_em,
        conclusoes.aprovada
      FROM conclusoes
      JOIN tarefas
        ON conclusoes.tarefa_id = tarefas.id
      JOIN usuarios
        ON conclusoes.usuario_id = usuarios.id
      WHERE conclusoes.id = ?
    `)
    .get(resultado.lastInsertRowid);

  res.status(201).json(conclusao);
});

// Aprovar conclusão
router.patch("/:id/aprovar", (req, res) => {
  const { id } = req.params;

  const conclusao = db
    .prepare(`
      SELECT
        conclusoes.id,
        conclusoes.usuario_id,
        conclusoes.aprovada,
        tarefas.pontos
      FROM conclusoes
      JOIN tarefas
        ON conclusoes.tarefa_id = tarefas.id
      WHERE conclusoes.id = ?
    `)
    .get(id) as {
      id: number;
      usuario_id: number;
      aprovada: number;
      pontos: number;
    } | undefined;

  if (!conclusao) {
    return res.status(404).json({
      erro: "Conclusão não encontrada."
    });
  }

  if (conclusao.aprovada === 1) {
    return res.status(400).json({
      erro: "Essa conclusão já foi aprovada."
    });
  }

  db.prepare(`
    UPDATE conclusoes
    SET aprovada = 1
    WHERE id = ?
  `).run(id);

  db.prepare(`
    UPDATE usuarios
    SET xp = xp + ?
    WHERE id = ?
  `).run(conclusao.pontos, conclusao.usuario_id);

  const resultado = db
    .prepare(`
      SELECT
        conclusoes.id,
        conclusoes.tarefa_id,
        tarefas.titulo AS tarefa,
        conclusoes.usuario_id,
        usuarios.nome AS usuario,
        tarefas.pontos,
        usuarios.xp,
        conclusoes.concluida_em,
        conclusoes.aprovada
      FROM conclusoes
      JOIN tarefas
        ON conclusoes.tarefa_id = tarefas.id
      JOIN usuarios
        ON conclusoes.usuario_id = usuarios.id
      WHERE conclusoes.id = ?
    `)
    .get(id);

  res.json(resultado);
});

export default router;