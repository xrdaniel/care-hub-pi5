const pool = require('../config/db');

// 🔹 Função para criar uma dica de saúde
const createDicaSaude = async (titulo, descricao, imagem, especialidade) => {
  const query = `
    INSERT INTO dicas_saude (titulo, descricao, imagem, especialidade)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [titulo, descricao, imagem, especialidade];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// 🔹 Função para listar **todas** as dicas de saúde (independente da especialidade)
const getAllDicasSaude = async () => {
  const query = 'SELECT * FROM dicas_saude';
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  createDicaSaude,
  getAllDicasSaude,
};
