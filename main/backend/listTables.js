const pool = require('./src/config/db');

const listTables = async () => {
  try {
    const res = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    console.log('Tabelas no banco de dados:', res.rows);
  } catch (err) {
    console.error('Erro ao listar tabelas:', err);
  }
};

listTables();