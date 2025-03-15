const pool = require('./src/config/db');
require('dotenv').config();

console.log('Credenciais do banco de dados:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const testConnection = async () => {
  try {
    const client = await pool.connect(); // Conecta ao banco de dados
    console.log('Conexão estabelecida com sucesso!');

    const res = await client.query('SELECT NOW()');
    console.log('Resultado da consulta:', res.rows[0]);

    client.release(); // Libera o cliente de volta para o pool
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
};

testConnection();