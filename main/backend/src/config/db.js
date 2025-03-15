const { Pool } = require('pg');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do .env
dotenv.config({ path: __dirname + '/../../.env' });

console.log("📌 Credenciais do banco carregadas:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Permite conexões seguras com o Tembo
  }
});

module.exports = pool;
