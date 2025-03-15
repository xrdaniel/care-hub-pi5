const hospitalModel = require('../models/hospitalModel');
const userModel = require('../models/userModel'); // 🔹 Importando o modelo de usuário para verificar o cargo

// 🔹 Função para cadastrar um hospital (Apenas para administradores)
const cadastrarHospital = async (req, res) => {
  const { nome, endereco, telefone, adminEmail } = req.body; // 🔥 Adicionando o email do admin para verificar

  try {
    // 🔹 Buscar o usuário para verificar se ele é admin
    const adminUser = await userModel.getUserByEmail(adminEmail);

    if (!adminUser || adminUser.cargo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem cadastrar hospitais.' });
    }

    // Se for admin, cadastrar hospital
    const hospital = await hospitalModel.createHospital(nome, endereco, telefone);
    res.status(201).json({ message: 'Hospital cadastrado com sucesso!', hospital });
  } catch (err) {
    console.error('Erro ao cadastrar hospital:', err);
    res.status(500).json({ message: 'Erro ao cadastrar hospital' });
  }
};

// 🔹 Função para listar todos os hospitais
const listarHospitais = async (req, res) => {
  try {
    const hospitais = await hospitalModel.getAllHospitals();
    res.status(200).json(hospitais);
  } catch (err) {
    console.error('Erro ao listar hospitais:', err);
    res.status(500).json({ message: 'Erro ao listar hospitais' });
  }
};

module.exports = {
  cadastrarHospital,
  listarHospitais,
};
