const dicaSaudeModel = require('../models/dicaSaudeModel');

// 🔹 Cadastrar uma nova dica de saúde
const cadastrarDicaSaude = async (req, res) => {
  const { titulo, descricao, imagem, especialidade } = req.body;

  try {
    const dica = await dicaSaudeModel.createDicaSaude(titulo, descricao, imagem, especialidade);
    res.status(201).json({ message: 'Dica de saúde cadastrada com sucesso', dica });
  } catch (err) {
    console.error('Erro ao cadastrar dica de saúde:', err);
    res.status(500).json({ message: 'Erro ao cadastrar dica de saúde' });
  }
};

// 🔹 **Listar todas as dicas de saúde** (independente da especialidade)
const listarDicasSaude = async (req, res) => {
  try {
    const dicas = await dicaSaudeModel.getAllDicasSaude();
    res.status(200).json(dicas);
  } catch (err) {
    console.error('Erro ao listar dicas de saúde:', err);
    res.status(500).json({ message: 'Erro ao listar dicas de saúde' });
  }
};

module.exports = {
  cadastrarDicaSaude,
  listarDicasSaude,
};
