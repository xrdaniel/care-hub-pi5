import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/cadastroHospitais.css";
import logo from "../assets/logo.png";

const CadastroHospitais = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!admin || admin.cargo !== "admin") {
      navigate("/");
    }
  }, [admin, navigate]);

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!nome || !endereco || !telefone) {
      setMensagem("⚠️ Preencha todos os campos.");
      return;
    }

    axios
      .post("http://localhost:5000/api/hospitais/cadastrar", {
        nome,
        endereco,
        telefone,
        adminEmail: admin.email, 
      })
      .then((res) => {
        setMensagem("✅ Hospital cadastrado com sucesso!");
        setNome("");
        setEndereco("");
        setTelefone("");
        setTimeout(() => {
          navigate("/dashboard-admin");
        }, 3000);
      })
      .catch((err) => {
        console.error("Erro ao cadastrar hospital:", err);
        setMensagem("❌ Erro ao cadastrar hospital.");
      });
  };

  return (
    <div className="cadastro-hospitais-page">
      <header className="dashboard-header">
        <img src={logo} alt="Care Hub" className="logo" />
        <nav className="dashboard-nav">
          <a href="/dashboard-admin">Dashboard</a>
          <a href="/gerenciar-usuarios">Usuários</a>
          <a href="/visualizar-consultas">Consultas</a>
          <a href="/visualizar-emergencias">Emergências</a>
          <a href="/cadastro-dicas">Dicas</a>
          <a href="/cadastro-hospitais" className="active">Hospitais</a>
          <a href="/" className="logout" onClick={() => localStorage.removeItem("user")}>Sair</a>
        </nav>
      </header>

      <section className="cadastro-hospitais-section">
        <h1>🏥 Cadastrar Novo Hospital</h1>
        <p>Preencha os dados abaixo para adicionar um novo hospital.</p>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <form className="cadastro-hospitais-form" onSubmit={handleCadastro}>
          <input
            type="text"
            placeholder="Nome do Hospital"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Endereço Completo"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Telefone (ex: 11 99999-9999)"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <button type="submit">Cadastrar Hospital</button>
        </form>
      </section>
    </div>
  );
};

export default CadastroHospitais;
