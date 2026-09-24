import Database from "better-sqlite3";

const db = new Database("./database/casaxp.db");

db.pragma("foreign_keys = ON");

console.log("Banco de dados conectado!");

export default db;