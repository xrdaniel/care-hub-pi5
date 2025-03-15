const express = require("express");
const router = express.Router();
const emergenciaController = require("../controllers/emergenciaController");

// Criar Emergência
router.post("/criar", emergenciaController.criarEmergencia);

// Listar emergências (todas ou por CPF)
router.get("/listar", emergenciaController.listarFichasEmergencia);

module.exports = router;
