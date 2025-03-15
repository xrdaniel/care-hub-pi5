const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consultaController");

// 🔸 Rota para marcar consulta
router.post("/marcar", consultaController.marcarConsulta);

// 🔸 Rota para listar todas as consultas
router.get("/listar", consultaController.listarFichasConsulta);

// ✅ Rota para cancelar consulta
router.delete("/cancelar/:id", consultaController.cancelarConsulta);

module.exports = router;
