const pool = require('../config/db');

// 🔍 Buscar usuário pelo email
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// 💾 Executar query genérica
const query = async (query, values) => {
  return await pool.query(query, values);
};

// 📋 Listar todos os usuários
const getAllUsers = async () => {
  const query = 'SELECT cpf, nome, email, telefone, endereco, data_cadastro, cargo FROM usuarios';
  const result = await pool.query(query);
  return result.rows;
};

// 🔄 Atualizar cargo do usuário
const updateUserRole = async (email, novoCargo) => {
  const query = 'UPDATE usuarios SET cargo = $1 WHERE email = $2 RETURNING *';
  const values = [novoCargo, email];
  const result = await pool.query(query, values);
  return result.rowCount > 0;
};

// ❌ DELETAR usuário pelo email (ESSA É A FUNÇÃO FALTANDO PRA VOCÊ)
const deleteUserByEmail = async (email) => {
  const query = 'DELETE FROM usuarios WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rowCount > 0;
};

// ✅ EXPORTANDO TUDO CORRETAMENTE
module.exports = {
  getUserByEmail,
  query,
  getAllUsers,
  updateUserRole,
  deleteUserByEmail // <- ESSE AQUI TEM QUE ESTAR PRESENTE!!
};
