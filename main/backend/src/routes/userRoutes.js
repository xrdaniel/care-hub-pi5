const express = require('express');
const {
  loginUser,
  cadastrarUsuario,
  listarUsuarios,
  buscarUsuario,
  deletarUsuario,
  atualizarCargo // 🔥 Certifique-se de que esta função está definida no userController.js
} = require('../controllers/userController');

const router = express.Router();

// Rota de login
router.post('/login', loginUser);

// Rota de cadastro de usuário
router.post('/cadastrar', cadastrarUsuario);

// Rota para listar todos os usuários cadastrados (Apenas Admin)
router.get('/listar', listarUsuarios);

// Rota para buscar um usuário pelo email
router.get('/buscar', buscarUsuario);

// Rota para deletar um usuário pelo email
router.delete('/deletar', deletarUsuario);

// 🔥 Nova rota para atualizar o cargo do usuário (apenas Admin pode fazer isso)
router.put('/atualizarCargo', atualizarCargo);

module.exports = router;
