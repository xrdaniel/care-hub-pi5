const pool = require('./config/db');

const updateDatabase = async () => {
  try {
    console.log('🔄 Verificando se a coluna "especialidade" já existe na tabela "dicas_saude"...');

    // Consulta para verificar se a coluna já existe
    const checkColumn = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'dicas_saude' AND column_name = 'especialidade'
    `);

    if (checkColumn.rows.length === 0) {
      console.log('📌 Coluna "especialidade" não encontrada. Adicionando ao banco...');

      // Adiciona a coluna especialidade
      await pool.query(`
        ALTER TABLE dicas_saude
        ADD COLUMN especialidade VARCHAR(100) NOT NULL DEFAULT 'Geral'
      `);

      console.log('✅ Coluna "especialidade" adicionada com sucesso!');
    } else {
      console.log('✅ A coluna "especialidade" já existe na tabela "dicas_saude". Nenhuma ação necessária.');
    }
  } catch (err) {
    console.error('❌ Erro ao atualizar banco:', err);
  } finally {
    pool.end();
  }
};

// Executa a função de atualização do banco
updateDatabase();
