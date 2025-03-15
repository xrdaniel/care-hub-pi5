const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

router.post('/cadastrar', hospitalController.cadastrarHospital);
router.get('/listar', hospitalController.listarHospitais);

module.exports = router;
