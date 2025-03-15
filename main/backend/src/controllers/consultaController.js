const consultaModel = require("../models/consultaModel");

// 📌 Marcar Consulta
const marcarConsulta = async (req, res) => {
  const { cpf_usuario, hospital_id, data_hora, forma_pagamento, especialidade } = req.body;

  try {
    if (!cpf_usuario || !hospital_id || !data_hora || !forma_pagamento || !especialidade) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const valoresPorEspecialidade = {
      "GERAL": 100.00,
      "CARDIOLOGIA": 150.00,
      "ORTOPEDIA": 120.00,
      "DERMATOLOGIA": 130.00,
      "PEDIATRIA": 110.00,
      "OFTALMOLOGIA": 125.00
    };

    const valorConsulta = valoresPorEspecialidade[especialidade.toUpperCase()] || 100.00;

    const consulta = await consultaModel.createFichaConsulta(
      cpf_usuario,
      hospital_id,
      data_hora,
      valorConsulta,
      forma_pagamento,
      especialidade
    );

    res.status(201).json({ message: "Consulta marcada com sucesso!", consulta });
  } catch (err) {
    console.error("❌ Erro ao marcar consulta:", err);
    res.status(500).json({ message: "Erro ao marcar consulta", error: err.message });
  }
};

// 📋 Listar Fichas de Consulta (opcionalmente com filtro por CPF)
const listarFichasConsulta = async (req, res) => {
  try {
    const { cpf } = req.query;

    let fichas;
    if (cpf) {
      fichas = await consultaModel.getFichasConsultaByCpf(cpf);
    } else {
      fichas = await consultaModel.getAllFichasConsulta();
    }

    res.status(200).json(fichas);
  } catch (err) {
    console.error("Erro ao listar fichas de consulta:", err);
    res.status(500).json({ message: "Erro ao listar fichas de consulta" });
  }
};

// ❌ Cancelar Consulta por ID
const cancelarConsulta = async (req, res) => {
  const { id } = req.params;

  try {
    const cancelada = await consultaModel.deleteConsultaById(id);
    if (cancelada) {
      return res.status(200).json({ message: "Consulta cancelada com sucesso!" });
    } else {
      return res.status(404).json({ message: "Consulta não encontrada." });
    }
  } catch (err) {
    console.error("Erro ao cancelar consulta:", err);
    res.status(500).json({ message: "Erro ao cancelar consulta" });
  }
};

module.exports = {
  marcarConsulta,
  listarFichasConsulta,
  cancelarConsulta
};
