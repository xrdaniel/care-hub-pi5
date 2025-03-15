const pool = require("../config/db");

// 📌 Criar Ficha de Emergência
const createFichaEmergencia = async (cpf_usuario, descricao, hospital_id) => {
  const query = `
    INSERT INTO fichas_emergencia (cpf_usuario, descricao, hospital_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [cpf_usuario, descricao, hospital_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// 📋 Listar todas as Fichas de Emergência
const getAllFichasEmergencia = async () => {
  const result = await pool.query("SELECT * FROM fichas_emergencia ORDER BY data_hora DESC;");
  return result.rows;
};

// 📋 Listar por CPF
const getFichasEmergenciaByCpf = async (cpf) => {
  const result = await pool.query("SELECT * FROM fichas_emergencia WHERE cpf_usuario = $1 ORDER BY data_hora DESC;", [cpf]);
  return result.rows;
};

module.exports = {
  createFichaEmergencia,
  getAllFichasEmergencia,
  getFichasEmergenciaByCpf
};
