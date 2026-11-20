// Conexão com o Postgres e criação das tabelas na subida (idempotente).
const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.PG_POOL || 5),
  ssl: process.env.PGSSL === "1" ? { rejectUnauthorized: false } : undefined
});
const q = (text, params) => pool.query(text, params);
const preparar = () => q(fs.readFileSync(path.join(__dirname, "esquema.sql"), "utf8"));

module.exports = { pool, q, preparar };
