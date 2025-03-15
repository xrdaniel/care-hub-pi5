const emergenciaModel = require("../models/emergenciaModel");

// Criar Emergência
const criarEmergencia = async (req, res) => {
  const { cpf_usuario, descricao, hospital_id } = req.body;

  if (!cpf_usuario || !descricao || !hospital_id) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  try {
    const ficha = await emergenciaModel.createFichaEmergencia(cpf_usuario, descricao, hospital_id);
    res.status(201).json({ message: "Emergência registrada com sucesso!", ficha });
  } catch (err) {
    console.error("Erro ao registrar emergência:", err);
    res.status(500).json({ message: "Erro ao registrar emergência" });
  }
};

// Listar Emergências (todas ou por CPF)
const listarFichasEmergencia = async (req, res) => {
  try {
    const { cpf } = req.query;
    let fichas;

    if (cpf) {
      fichas = await emergenciaModel.getFichasEmergenciaByCpf(cpf);
    } else {
      fichas = await emergenciaModel.getAllFichasEmergencia();
    }

    res.status(200).json(fichas);
  } catch (err) {
    console.error("Erro ao listar emergências:", err);
    res.status(500).json({ message: "Erro ao listar emergências" });
  }
};

module.exports = {
  criarEmergencia,
  listarFichasEmergencia
};
