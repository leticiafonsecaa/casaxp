import db from "../database";

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL,
    xp INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    pontos INTEGER NOT NULL,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );

  CREATE TABLE IF NOT EXISTS conclusoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tarefa_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    concluida_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    aprovada INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (tarefa_id) REFERENCES tarefas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );

  CREATE TABLE IF NOT EXISTS recompensas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    custo_xp INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS resgates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recompensa_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    resgatado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (recompensa_id) REFERENCES recompensas(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
`);

try {
  db.exec(`
    ALTER TABLE usuarios
    ADD COLUMN xp INTEGER NOT NULL DEFAULT 0
  `);
} catch (erro) {
  // A coluna já existe
}

console.log("Tabelas usuarios, tarefas, conclusoes e recompensas prontas!");