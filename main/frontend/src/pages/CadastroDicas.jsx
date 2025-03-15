import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/cadastroDicas.css";
import logo from "../assets/logo.png";

const CadastroDicas = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.cargo !== "admin") {
      navigate("/");
    }
  }, [admin, navigate]);

  const handleCadastrar = (e) => {
    e.preventDefault();

    if (!titulo || !descricao || !especialidade) {
      setMensagem("⚠️ Preencha todos os campos!");
      return;
    }

    axios.post("http://localhost:5000/api/dicas-saude/cadastrar", {
      titulo,
      descricao,
      especialidade
    })
      .then(() => {
        setMensagem("✅ Dica cadastrada com sucesso!");
        setTitulo("");
        setDescricao("");
        setEspecialidade("");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar dica:", err);
        setMensagem("❌ Erro ao cadastrar dica.");
      });
  };

  return (
    <div className="cadastro-dicas">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard-admin">Dashboard</a>
          <a href="/gerenciar-usuarios">Gerenciar Usuários</a>
          <a href="/visualizar-consultas">Consultas</a>
          <a href="/visualizar-emergencias">Emergências</a>
          <a href="/cadastro-dicas" className="active">Cadastrar Dicas</a>
          <a href="/cadastro-hospitais">Cadastrar Hospitais</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="cadastro-dicas-section">
        <h1>📝 Cadastro de Dicas de Saúde</h1>
        {mensagem && <p className="mensagem">{mensagem}</p>}
        <form className="dica-form" onSubmit={handleCadastrar}>
          <label>Título da Dica</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="5"
            required
          />

          <label>Especialidade</label>
          <select
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required
          >
            <option disabled value="">Selecione</option>
            <option value="GERAL">GERAL</option>
            <option value="CARDIOLOGIA">CARDIOLOGIA</option>
            <option value="DERMATOLOGIA">DERMATOLOGIA</option>
            <option value="PEDIATRIA">PEDIATRIA</option>
            <option value="ORTOPEDIA">ORTOPEDIA</option>
            <option value="GINECOLOGIA">GINECOLOGIA</option>
          </select>

          <button type="submit">Cadastrar Dica</button>
        </form>
      </section>
    </div>
  );
};

export default CadastroDicas;
