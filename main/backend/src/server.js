const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const emergenciaRoutes = require('./routes/emergenciaRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const dicaSaudeRoutes = require('./routes/dicaSaudeRoutes'); // 🔥 Nova rota

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/emergencias', emergenciaRoutes);
app.use('/api/hospitais', hospitalRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/dicas-saude', dicaSaudeRoutes); // 🔥 Adicionando a nova rota de dicas de saúde

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
