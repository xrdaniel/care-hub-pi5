const pool = require('./src/config/db');

const createTables = async () => {
  try {
    // Criação da tabela de usuários
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        cpf CHAR(11) PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        telefone VARCHAR(20),
        endereco TEXT,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criação da tabela de hospitais
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hospitais (
        hospital_id SERIAL PRIMARY KEY,
        nome VARCHAR(150) NOT NULL,
        endereco TEXT NOT NULL,
        telefone VARCHAR(20) NOT NULL
      )
    `);

    // Criação da tabela de fichas de emergência
    await pool.query(`
      CREATE TABLE IF NOT EXISTS fichas_emergencia (
        id SERIAL PRIMARY KEY,
        cpf_usuario CHAR(11) NOT NULL,
        hospital_id INT,
        data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        observacoes TEXT,
        CONSTRAINT fk_fichas_usuario FOREIGN KEY (cpf_usuario) REFERENCES usuarios(cpf) ON DELETE CASCADE,
        CONSTRAINT fk_fichas_hospital FOREIGN KEY (hospital_id) REFERENCES hospitais(hospital_id) ON DELETE SET NULL
      )
    `);

    // 📌 Atualização: Agora fichas de consulta referenciam hospitais cadastrados
    await pool.query(`
      DROP TABLE IF EXISTS fichas_consulta CASCADE;
      CREATE TABLE fichas_consulta (
        id SERIAL PRIMARY KEY,
        cpf_usuario CHAR(11) NOT NULL,
        hospital_id INT NOT NULL,
        data_hora TIMESTAMP NOT NULL,
        valor DECIMAL(8,2) NOT NULL,
        forma_pagamento VARCHAR(50) NOT NULL,
        CONSTRAINT chk_forma_pagamento CHECK (forma_pagamento IN ('Cartão de Crédito', 'Cartão de Débito', 'Dinheiro', 'PIX', 'Boleto')),
        CONSTRAINT fk_consulta_usuario FOREIGN KEY (cpf_usuario) REFERENCES usuarios(cpf) ON DELETE CASCADE,
        CONSTRAINT fk_consulta_hospital FOREIGN KEY (hospital_id) REFERENCES hospitais(hospital_id) ON DELETE CASCADE
      )
    `);

    // Criação da tabela de dicas de saúde
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dicas_saude (
        tip_id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        imagem TEXT
      )
    `);

    // Criação da tabela de redefinição de senha
    await pool.query(`
      CREATE TABLE IF NOT EXISTS redefinicao_senha (
        token_id SERIAL PRIMARY KEY,
        cpf_usuario CHAR(11) NOT NULL,
        token VARCHAR(255) NOT NULL UNIQUE,
        data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        validade TIMESTAMP NOT NULL,
        CONSTRAINT fk_redefinicao_usuario FOREIGN KEY (cpf_usuario) REFERENCES usuarios(cpf) ON DELETE CASCADE
      )
    `);

    // Criação de índices para otimização
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuarios(email)
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_fichas_emergencia_usuario ON fichas_emergencia(cpf_usuario)
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_fichas_consulta_usuario ON fichas_consulta(cpf_usuario)
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_redefinicao_senha_usuario ON redefinicao_senha(cpf_usuario)
    `);

    console.log('✅ Tabelas criadas/atualizadas com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao criar tabelas:', err);
  } finally {
    // Encerra a conexão com o pool
    await pool.end();
  }
};

// Executa o script
createTables();
