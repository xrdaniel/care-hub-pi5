const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

// 🔐 Função de login
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);
    
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    res.status(200).json({
      message: 'Login bem-sucedido',
      user: {
        cpf: user.cpf,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        endereco: user.endereco,
        data_cadastro: user.data_cadastro,
        cargo: user.cargo,
      },
    });
  } catch (err) {
    console.error('Erro ao realizar login:', err);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
};

// 🆕 Função para cadastrar usuário
const cadastrarUsuario = async (req, res) => {
  const { cpf, nome, email, senha, telefone, endereco, cargo = "usuario" } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const query = `
      INSERT INTO usuarios (cpf, nome, email, senha, telefone, endereco, cargo)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [cpf, nome, email, senhaHash, telefone, endereco, cargo];
    const result = await userModel.query(query, values);

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);

    // ✅ Tratamento detalhado para CPF ou E-mail já existentes
    if (err.code === '23505') {
      const detail = err.detail || '';
      if (detail.includes('(email)')) {
        return res.status(400).json({ message: 'Este e-mail já está em uso.' });
      } else if (detail.includes('(cpf)')) {
        return res.status(400).json({ message: 'Este CPF já está em uso.' });
      } else {
        return res.status(400).json({ message: 'CPF ou e-mail já estão em uso.' });
      }
    }

    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
};

// 🔍 Listar todos os usuários
const listarUsuarios = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

// 🔍 Buscar um usuário pelo email
const buscarUsuario = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

// ❌ Deletar usuário pelo email
const deletarUsuario = async (req, res) => {
  const { email } = req.query;

  try {
    const deletado = await userModel.deleteUserByEmail(email);
    if (!deletado) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

// 🎭 Atualizar Cargo do Usuário
const atualizarCargo = async (req, res) => {
  const { email, novoCargo, adminEmail } = req.body;

  try {
    const admin = await userModel.getUserByEmail(adminEmail);

    if (!admin || admin.cargo !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem alterar cargos.' });
    }

    const atualizado = await userModel.updateUserRole(email, novoCargo);
    
    if (atualizado) {
      res.status(200).json({ message: `Cargo de ${email} atualizado para ${novoCargo}` });
    } else {
      res.status(404).json({ message: 'Usuário não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao atualizar cargo:', err);
    res.status(500).json({ message: 'Erro ao atualizar cargo' });
  }
};

module.exports = {
  loginUser,
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuario,
  deletarUsuario,
  atualizarCargo,
};
