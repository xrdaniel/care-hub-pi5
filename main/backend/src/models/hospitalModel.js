const pool = require('../config/db');

const createHospital = async (nome, endereco, telefone) => {
  const query = `
    INSERT INTO hospitais (nome, endereco, telefone)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [nome, endereco, telefone];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllHospitals = async () => {
  const query = 'SELECT * FROM hospitais';
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  createHospital,
  getAllHospitals,
};
