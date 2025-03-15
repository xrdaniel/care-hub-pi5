const pool = require('./src/config/db');

const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexão com o banco estabelecida com sucesso!');

    const res = await client.query('SELECT NOW()');
    console.log('🕒 Hora do servidor:', res.rows[0]);

    client.release(); // Libera a conexão
  } catch (err) {
    console.error('❌ Erro ao conectar ao banco:', err.message);
  }
};

testConnection();
