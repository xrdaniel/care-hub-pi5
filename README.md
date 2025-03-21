# 💙 CareHub - Projeto Integrador V - SENAC

> _Sistema de gestão de saúde digital simples, funcional e moderno._

📌 **Projeto Integrador V** do curso de **Análise e Desenvolvimento de Sistemas** do **SENAC**, desenvolvido em grupo para atender a proposta de um sistema completo com **backend, banco de dados, frontend e landing page**.

---

## ✨ Sobre o Projeto

O **CareHub** foi criado para facilitar o cuidado com a saúde de forma prática e acessível. O sistema oferece:

- 📅 **Agendamento de Consultas**
- 🚨 **Registro de Emergências**
- 💡 **Dicas de Saúde**
- 👨‍⚕️ **Painel Administrativo para Gerenciamento de Usuários, Dicas e Hospitais**

---

## 📹 Demonstração do Projeto

🎥 Um vídeo explicando o projeto está disponível no Youtube:
👉 (https://www.youtube.com/watch?v=DkRUHjjEMU8)

---

## 🌐 GitHub Pages (Landing Page)

Uma **landing page demonstrativa** do sistema já está online:

👉 [https://xrdaniel.github.io/care-hub-pi5](https://xrdaniel.github.io/care-hub-pi5)

> A página foi criada para apresentar visualmente o projeto, seus objetivos e como ele funciona.

---

## 🚀 Tecnologias Utilizadas

- ⚛️ ReactJS (Frontend)
- 🟩 Node.js + Express (Backend)
- 🐘 PostgreSQL com TemboDB (Banco de Dados na nuvem)
- 🖼 HTML, CSS e JavaScript (Landing Page)
- ☁️ GitHub Pages (Publicação da apresentação)

---

## 🛠 Como Rodar o Projeto Localmente

### 1. Clone este repositório:
```bash
git clone https://github.com/xrdaniel/care-hub-pi5.git

2. Instale as dependências:
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Configure a conexão com seu banco PostgreSQL (Tembo ou local) no arquivo:
/backend/src/config/db.js

4. Inicie o backend:
cd backend/src
node server.js

5. Inicie o frontend:
cd frontend/src
npm run dev

6. Acesse no navegador:
arduino
Copiar
http://localhost:5173


📂 Estrutura do Projeto
pgsql
Copiar
care-hub-pi5/
│
├── backend/            → API Node.js + PostgreSQL
├── frontend/           → Interface em ReactJS
├── database/           → Modelo físico do banco de dados
│   └── modelo_fisico_carehub.txt
├── docs/              → Landing page publicada no GitHub Pages
└── README.md



🗃 Banco de Dados
O banco de dados está hospedado no TemboDB (PostgreSQL na nuvem).

🔐 Por segurança, o banco não está incluso diretamente no repositório.
✅ O modelo físico completo com tabelas e colunas está disponível na pasta:

/database/modelo_fisico_carehub.txt
Também é possível recriar o banco localmente com base nos arquivos de estrutura SQL e scripts usados no backend.


📌 Observações Finais
Este projeto foi desenvolvido com muito empenho pelos alunos como parte avaliativa do Projeto Integrador V – Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas – SENAC.

Todo o código está disponível para fins acadêmicos e aprendizado.
Contribuições são bem-vindas! 

