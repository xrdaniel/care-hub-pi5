const pool = require("../config/db");

// 📌 Criar Ficha de Consulta
const createFichaConsulta = async (cpf_usuario, hospital_id, data_hora, valor, forma_pagamento, especialidade) => {
  const query = `
    INSERT INTO fichas_consulta (cpf_usuario, hospital_id, data_hora, valor, forma_pagamento, especialidade)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  
  const values = [cpf_usuario, hospital_id, data_hora, valor, forma_pagamento, especialidade];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("❌ Erro ao inserir ficha de consulta:", error);
    throw error;
  }
};

// 📋 Listar todas as Fichas de Consulta
const getAllFichasConsulta = async () => {
  try {
    const result = await pool.query("SELECT * FROM fichas_consulta ORDER BY data_hora ASC;");
    return result.rows;
  } catch (error) {
    console.error("❌ Erro ao buscar fichas de consulta:", error);
    throw error;
  }
};

// 📋 Listar Fichas de Consulta por CPF do usuário
const getFichasConsultaByCpf = async (cpf) => {
  try {
    const result = await pool.query("SELECT * FROM fichas_consulta WHERE cpf_usuario = $1 ORDER BY data_hora ASC;", [cpf]);
    return result.rows;
  } catch (error) {
    console.error("❌ Erro ao buscar fichas por CPF:", error);
    throw error;
  }
};

// ❌ Cancelar (deletar) uma consulta por ID
const deleteConsultaById = async (id) => {
  try {
    const result = await pool.query("DELETE FROM fichas_consulta WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("❌ Erro ao deletar consulta:", error);
    throw error;
  }
};

module.exports = {
  createFichaConsulta,
  getAllFichasConsulta,
  getFichasConsultaByCpf,
  deleteConsultaById
};
