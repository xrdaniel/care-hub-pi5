#  CareHub - Projeto Integrador V - SENAC

> _Sistema de gestão de saúde digital simples, funcional e moderno._

📌 **Projeto Integrador V** do curso de **Análise e Desenvolvimento de Sistemas** do **SENAC**, desenvolvido em grupo para atender a proposta de um sistema completo com backend, banco de dados, frontend e landing page.

---

## ✨ Sobre o Projeto

O **CareHub** foi criado para facilitar o cuidado com a saúde de forma prática e acessível. O sistema oferece:

- 📅 **Agendamento de Consultas**
- 🚨 **Registro de Emergências**
- 💡 **Dicas de Saúde**
- 👨‍⚕️ **Painel Administrativo para Gerenciamento**

---

## 📹 Demonstração do Projeto

🎥 Um vídeo completo explicando o projeto está disponível no perfil **[_xrdan](https://www.tiktok.com/@_xrdan)** no TikTok.

Acesse para entender o funcionamento, as funcionalidades e como utilizá-lo.

---

## 🌐 GitHub Pages (Landing Page)

Uma landing page com apresentação do sistema já está disponível online:

👉 Acesse: [https://xrdaniel.github.io/care-hub-pi5](https://xrdaniel.github.io/care-hub-pi5)

> Essa página foi criada para representar visualmente o projeto, apresentar seus objetivos e facilitar o entendimento do funcionamento.

---

## 🚀 Tecnologias Utilizadas

- ReactJS (Frontend)
- Node.js / Express / PostgreSQL (Backend)
- HTML, CSS e JavaScript (Landing Page)
- TemboDB (Banco de Dados)
- GitHub Pages (Apresentação online)

---

## 🛠 Como Rodar o Projeto Localmente

1. Clone este repositório:
```bash
git clone https://github.com/xrdaniel/care-hub-pi5.git

Instale as dependências do backend e frontend:
bash
Copiar
cd backend
npm install

cd ../frontend
npm install
Configure a conexão com seu banco de dados PostgreSQL (TemboDB ou local) no backend.

Inicie o backend:

bash
Copiar
npm start
Inicie o frontend:
bash
Copiar
npm run dev
Acesse no navegador:
arduino
Copiar
http://localhost:5173
📂 Estrutura do Projeto
Copiar
care-hub-pi5/
│
├── backend/
│   └── ... rotas, controllers, models, banco
│
├── frontend/
│   └── ... telas ReactJS
│
├── pages/
│   └── index.html (Landing Page)
│
└── README.md


## 🗃 Banco de Dados

> O banco de dados utilizado neste projeto está hospedado no **TemboDB (PostgreSQL na nuvem)**.

Por questões de segurança e privacidade, o banco **não foi incluído diretamente no repositório**, mas está disponível em ambiente próprio e acessível apenas ao grupo responsável.

Caso queira executar o sistema localmente, você pode:
- Utilizar sua própria instância local do PostgreSQL
- Recriar a estrutura do banco a partir dos **scripts SQL disponíveis internamente no backend**

> **Obs:** Os scripts de criação de tabelas e conexões estão no diretório `/backend`, no modelo `fichas_consulta`, `users`, `emergencias`, etc.

📌 Observações Finais
Este projeto foi desenvolvido com muito empenho pelos alunos como parte avaliativa do Projeto Integrador V - Turma ADS - SENAC.

Todo o código está disponível para estudos, contribuições e aprendizado.
