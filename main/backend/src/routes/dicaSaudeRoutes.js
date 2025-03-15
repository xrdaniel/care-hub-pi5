const express = require('express');
const dicaSaudeController = require('../controllers/dicaSaudeController');

const router = express.Router();

// 🔹 Rota para cadastrar uma dica de saúde
router.post('/cadastrar', dicaSaudeController.cadastrarDicaSaude);

// 🔹 Rota para listar **todas as dicas**
router.get('/listar', dicaSaudeController.listarDicasSaude);

module.exports = router;
