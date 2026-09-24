import { Router } from "express";
import db from "./database";

const router = Router();

// Listar resgates
router.get("/", (req, res) => {
  const resgates = db
    .prepare(`
      SELECT
        resgates.id,
        usuarios.nome AS usuario,
        recompensas.nome AS recompensa,
        recompensas.custo_xp,
        resgates.resgatado_em
      FROM resgates
      JOIN usuarios
        ON resgates.usuario_id = usuarios.id
      JOIN recompensas
        ON resgates.recompensa_id = recompensas.id
    `)
    .all();

  res.json(resgates);
});

// Resgatar recompensa
router.post("/", (req, res) => {
  const { recompensa_id, usuario_id } = req.body;

  if (!recompensa_id || !usuario_id) {
    return res.status(400).json({
      erro: "Recompensa e usuário são obrigatórios."
    });
  }

  const recompensa = db
    .prepare("SELECT * FROM recompensas WHERE id = ?")
    .get(recompensa_id) as {
      id: number;
      nome: string;
      custo_xp: number;
    } | undefined;

  if (!recompensa) {
    return res.status(404).json({
      erro: "Recompensa não encontrada."
    });
  }

  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE id = ?")
    .get(usuario_id) as {
      id: number;
      nome: string;
      xp: number;
    } | undefined;

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado."
    });
  }

  if (usuario.xp < recompensa.custo_xp) {
    return res.status(400).json({
      erro: "XP insuficiente para resgatar essa recompensa."
    });
  }

  const resgate = db.transaction(() => {
    db.prepare(`
      UPDATE usuarios
      SET xp = xp - ?
      WHERE id = ?
    `).run(recompensa.custo_xp, usuario_id);

    const resultado = db
      .prepare(`
        INSERT INTO resgates (recompensa_id, usuario_id)
        VALUES (?, ?)
      `)
      .run(recompensa_id, usuario_id);

    return resultado.lastInsertRowid;
  })();

  const resultado = db
    .prepare(`
      SELECT
        resgates.id,
        usuarios.nome AS usuario,
        recompensas.nome AS recompensa,
        recompensas.custo_xp,
        usuarios.xp,
        resgates.resgatado_em
      FROM resgates
      JOIN usuarios
        ON resgates.usuario_id = usuarios.id
      JOIN recompensas
        ON resgates.recompensa_id = recompensas.id
      WHERE resgates.id = ?
    `)
    .get(resgate);

  res.status(201).json(resultado);
});

export default router;